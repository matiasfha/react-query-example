import React from 'react'

const defaultInitialState = {
    isLoading: false,
    isError: false,
    data: undefined
}

const defaultReducer = (state, action) => {
    switch (action.type) {
        case 'START_FETCH':
            return { ...state, isLoading: true }
        case 'SUCCESS':
            return { ...state, isLoading: false, data: action.payload }
        case 'ERROR':
            return { ...state, isLoading: false, isError: true, error: action.payload }
        default:
            return state
    }
}

const noopReducer = (state, _) => state

const combineReducers = (...reducers) => (state, action) => {
    return reducers.reduce((acc, nextReducer) => {
        return nextReducer(acc, action);
    }, state);
};

export default function useFetchState(initialState = {}, reducer = noopReducer) {
    const [state, dispatch] = React.useReducer(
        combineReducers(defaultReducer, reducer),
        {
            ...defaultInitialState,
            ...initialState
        }
    )

    const startFetch = () => dispatch({ type: 'START_FETCH' })
    const success = (data) => dispatch({ type: 'SUCCESS', payload: data })
    const error = (error) => dispatch({ type: 'ERROR', payload: error })

    return {
        state, startFetch, success, error, dispatch
    }

}