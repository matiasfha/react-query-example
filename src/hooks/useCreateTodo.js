import React from 'react'
import axios from 'axios'

export default function useCreateTodo() {
    const [state, setState] = React.useReducer((_, action) => action, {
        isIdle: true,
    })

    const mutate = React.useCallback(async (todo) => {
        setState({ isLoading: true })
        try {
            const data = axios.post('/api/todos', todo).then((res) => res.data)
            setState({ isSuccess: true, data })
        } catch (error) {
            console.error(error)
            setState({ isError: true, error })
        }
    }, [])

    return { mutate, ...state }
}