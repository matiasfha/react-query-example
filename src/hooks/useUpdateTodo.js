import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

const updateTodo = (todo) => axios
    .patch(`/api/todos/${todo.id}`, todo)
    .then((res) => {
        return res.data
    })

export default function useSavePost() {
    return useMutation(todo => updateTodo(todo))
}