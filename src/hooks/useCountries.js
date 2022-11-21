import React from 'react'
import { useFetchData } from '../data/fetchCountries'
import { useCountriesCache } from '../data/cacheCountries'
const api = `https://restcountries.com/v3.1/all?fields=capital,region,currencies,flags,population,name`

export const useCountries = () => {
	const [cache, dispatch] = useCountriesCache()
	const { data, error, status, execute, setData } = useFetchData()

	React.useEffect(() => {
		if (cache?.data && Date.now() < cache.expire) {
			setData(cache.data)
		} else {
			execute(
				fetch(api)
					.then((data) => data.json())
					.then((countryData) => {
						dispatch({ countryData })
						return countryData
					})
			)
		}
	}, [cache, dispatch, execute, setData])
	return { data, error, status }
}
