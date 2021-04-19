
import React from 'react'
import axios from 'axios'

export default function useDeleteTOdo() {
    const [state, setState] = React.useState({
        isIdle: true,
    })

    const mutate = React.useCallback(async (todoId) => {
        setState({ isLoading: true })
        try {
            const data = await axios.delete(`/api/todos/${todoId}`).then((res) => res.data)
            setState({ isSuccess: true, data })
        } catch (error) {
            setState({ isError: true, error })
        }
    }, [])

    return [mutate, state]
}