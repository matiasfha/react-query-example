import React from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';


const createTodo = (todo) => axios.post('/api/todos', todo).then(res => res.data)

export default function useCreateTodo() {
    const queryClient = useQueryClient()
    return useMutation(todo => createTodo(todo), {
        onMutate: async newTodo => {
            await queryClient.cancelQueries('todos'); //cancel any in-flight or pending query to the `todos` key

            const prev = queryClient.getQueryData('todos') // retrieve the cached data 

            queryClient.setQueryData('todos', old => [{ ...newTodo, id: Date.now() }, ...old]) //add the new todo to the data

            // return the previous list and the newTodo to be used later inside the context
            return {
                prev, newTodo
            }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData('todos', context.prev) //rollback the cache to the previous state
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos') //refetch the collection on the background
        }
    })
}