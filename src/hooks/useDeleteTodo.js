import React from 'react'
import axios from 'axios'
import useFetchState from './useFetchState'

export default function useDeleteTOdo() {
    const { state, startFetch, success, error } = useFetchState()

    const mutate = React.useCallback(async (todoId) => {
        startFetch()
        try {
            const data = await axios.delete(`/api/todos/${todoId}`).then((res) => res.data)
            success(data)
        } catch (e) {
            console.error(e)
            error(e)
        }
    }, [])

    return { mutate, ...state }
}