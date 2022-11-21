import React from 'react'

const CountriesCacheContext = React.createContext()

export const CountriesCacheProvider = (props) => {
	const [cache, dispatch] = React.useReducer(countriesCacheReducer, {})
	return (
		<CountriesCacheContext.Provider
			{...props}
			value={[cache, dispatch]}
		/>
	)
}

const countriesCacheReducer = (state, action) => {
	const ttl = 1_000 * 10
	const expire = Date.now() + ttl

	return { ...state, data: action.countryData, expire }
}

export const useCountriesCache = () => {
	const context = React.useContext(CountriesCacheContext)
	if (!context) {
		throw new Error(
			'useCountryCache doit être utilisé avec CountryCacheProvider'
		)
	}
	return context
}
