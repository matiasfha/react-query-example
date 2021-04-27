import React from 'react'
import axios from 'axios'
import useFetchState from './useFetchState'

export default function useSavePost() {
    const { state, startFetch, success, error } = useFetchState()

    const mutate = React.useCallback(async (values) => {
        startFetch()
        try {
            const data = await axios
                .patch(`/api/todos/${values.id}`, values)
                .then((res) => {
                    return res.data
                })
            success(data)
        } catch (e) {
            console.error(e)
            error(e)
        }
    }, [])

    return { mutate, ...state }
}