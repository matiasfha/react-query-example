import React from "react";
import axios from "axios";
import useFetchState from './useFetchState'

export const fetchTodo = (todoId) => axios.get(`/api/todos/${todoId}`).then((res => res.data))

export default function useTodo(todoId) {
    const { state, startFetch, success, error } = useFetchState()
    const refetch = React.useCallback(async () => {
        startFetch()
        try {
            const data = await fetchTodo(todoId)
            success(data)
        } catch (e) {
            console.log(e)
            error(e)
        }
    }, [])

    React.useEffect(() => {
        refetch();
    }, []);

    return {
        ...state,
        refetch
    };
}
