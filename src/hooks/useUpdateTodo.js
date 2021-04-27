import React from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

const updateTodo = (todo) => axios
    .patch(`/api/todos/${todo.id}`, todo)
    .then((res) => {
        return res.data
    })

export default function useSavePost() {
    const queryClient = useQueryClient()
    return useMutation(todo => updateTodo(todo), {
        onMutate: async todo => {
            await queryClient.cancelQueries('todos'); //cancel any in-flight or pending query to the `todos` key
            await queryClient.cancelQueries(['todos', todo.id])

            const prev = queryClient.getQueryData(['todos', todo.id]) // retrieve the cached data 

            queryClient.setQueryData(['todos', todo.id], todo) //add the new todo to the data
            // also update the whole list to enable smooth navigation
            queryClient.setQueryData('todos', (old = []) => {
                const index = old.findIndex(item => item.id === todo.id)
                return [...old.slice(0, index), todo, ...old.slice(index + 1, old.length)]
            })

            // return the previous list and the newTodo to be used later inside the context
            return {
                prev, todo
            }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(['todos', context.todo.id], context.prev) //rollback the cache to the previous state
        },
        onSettled: todo => {
            queryClient.invalidateQueries('todos') //refetch the collection on the background
            queryClient.invalidateQueries(['todos', todo.id]) //refetch the collection on the background
        }

    })
}