import React from 'react'
import axios from 'axios'

export default function useSavePost() {
    const [state, setState] = React.useState({
        isIdle: true,
    })

    const mutate = React.useCallback(async (values) => {
        setState({ isLoading: true })
        try {
            const data = await axios
                .patch(`/api/todos/${values.id}`, values)
                .then((res) => {
                    return res.data
                })
            setState({ isSuccess: true, data })
        } catch (error) {
            setState({ isError: true, error })
        }
    }, [])

    return [mutate, state]
}