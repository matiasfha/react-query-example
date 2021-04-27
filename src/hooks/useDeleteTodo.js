import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';

const deleteTodo = (todoId) => axios.delete(`/api/todos/${todoId}`).then((res) => res.data)

export default function useDeleteTodo() {
    return useMutation(todoId => deleteTodo(todoId))
}