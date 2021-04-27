import React from 'react'
import axios from 'axios'
import useFetchState from './useFetchState'

export default function useCreateTodo() {
    const { state, startFetch, success, error } = useFetchState()

    const mutate = React.useCallback(async (todo) => {
        startFetch()
        try {
            const data = axios.post('/api/todos', todo).then((res) => res.data)
            success(data)
        } catch (e) {
            console.error(e)
            error(e)
        }
    }, [])

    return { mutate, ...state }
}