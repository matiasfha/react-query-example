import React from "react";
import axios from "axios";
import { useQuery } from 'react-query'

export const fetchTodo = (todoId) => axios.get(`/api/todos/${todoId}`).then((res => res.data))

export default function useTodo(todoId) {
    return useQuery(['todos', todoId], () => fetchTodo(todoId))
}
