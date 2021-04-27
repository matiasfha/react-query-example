import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';


const createTodo = (todo) => axios.post('/api/todos', todo).then(res => res.data)

export default function useCreateTodo() {
    return useMutation(todo => createTodo(todo))
}