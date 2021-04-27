import React from "react";
import axios from "axios";
import { useQuery } from 'react-query'

const fetchTodos = () => axios.get('/api/todos').then(res => res.data)

export default function useTodos() {
  return useQuery('todos', fetchTodos)
}
