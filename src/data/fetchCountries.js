import React from 'react'

const reducer = (state, action) => {
	switch (action.type) {
		case 'fetching':
			return { status: 'fetching', data: null, error: null }
		case 'done':
			return { status: 'done', data: action.payload, error: null }
		case 'fail':
			return { status: 'fail', data: null, error: action.error }
		default:
			return new Error('Action non supporté')
	}
}
export const useFetchData = () => {
	const [state, dispatch] = React.useReducer(reducer, {
		data: null,
		error: null,
		status: 'idle',
	})

	const execute = React.useCallback((promise) => {
		dispatch({ type: 'fetching' })

		promise
			.then((response) => response.json())
			.then((country) => dispatch({ type: 'done', payload: country }))
			.catch((err) => dispatch({ type: 'fail', error: err }))
	}, [])

	const setData = React.useCallback(
		(data) => dispatch({ type: 'done', payload: data }),
		[]
	)
	return { ...state, execute, setData }
}
