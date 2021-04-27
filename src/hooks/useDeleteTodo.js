import React from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';

const deleteTodo = (todoId) => axios.delete(`/api/todos/${todoId}`).then((res) => res.data)

export default function useDeleteTodo() {
    const queryClient = useQueryClient()
    return useMutation(todoId => deleteTodo(todoId), {
        onMutate: async todo => {
            await queryClient.cancelQueries('todos'); //cancel any in-flight or pending query to the `todos` key

            const prev = queryClient.getQueryData('todos') // retrieve the cached data 

            queryClient.setQueryData('todos', (old = []) => old.filter(item => item.id !== todo.id))//remove the todo from the previous list

            // return the previous list and the todo
            return {
                prev, todo
            }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData('todos', context.prev) //rollback the cache to the previous state
        },
        onSettled: todo => {
            queryClient.invalidateQueries('todos') //refetch the collection on the background
        }

    })
}