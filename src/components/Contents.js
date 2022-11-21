import React from 'react'
import { useTheme } from '../styles-components/themesContext'
import { useCountries } from '../hooks/useCountries'

const Contents = ({ search, region }) => {
	const [component, setComponant] = React.useState(null)

	const state = useCountries()
	const { data, error, status } = state

	React.useEffect(() => {
		search !== '' ? setComponant('search') : setComponant(null)
	}, [search])

	React.useEffect(() => {
		region !== 'All' ? setComponant('region') : setComponant(null)
	}, [region])

	if (status === 'idle') return <ContentStatus text={`Initialisation...`} />
	else if (status === 'fetching')
		return <ContentStatus text={`En cours de chargement`} />
	else if (status === 'fail')
		return (
			<ContentStatus
				text={`Une erreur c'est produite`}
				value={error}
			/>
		)
	else
		return (
			<div className='flex flex-wrap justify-center'>
				{component !== null ? (
					component === 'search' ? (
						<ContentFilterBySearch
							world={data}
							search={search}
						/>
					) : (
						<ContentFilterByRegion
							world={data}
							region={region}
						/>
					)
				) : (
					<ContentDisplay dataFilter={data} />
				)}
			</div>
		)
}

const ContentStatus = ({ text, value = null }) => {
	return (
		<div>
			<p className='text-center h-screen'>
				{text} {value ? `: ${value}` : ''}
			</p>
		</div>
	)
}

const ContentDisplay = ({ dataFilter }) => {
	const [theme] = useTheme()
	return dataFilter.map((item, index) => (
		<div
			key={index}
			className='w-64 m-4 rounded-md'
			style={{ backgroundColor: theme.backgroundSd }}>
			<img
				src={item.flags.svg}
				alt='flag'
				className='h-40 mx-auto p-2'></img>
			<div className='m-4'>
				<p>Name: {item.name.official}</p>
				<p>Capital: {item.capital}</p>
				<p>Region: {item.region}</p>
				<p>Population: {item.population}</p>
				<p>
					Currencies :{' '}
					{Object.values(item.currencies).map((currency, index) => (
						<span key={index}>
							{currency.name} <br />
							Symbol : {currency.symbol}
						</span>
					))}
				</p>
			</div>
		</div>
	))
}

const ContentFilterBySearch = ({ world, search }) => {
	const dataFilter = world.filter((item) =>
		item.name.official.toLowerCase().includes(search.toLowerCase())
	)

	return <ContentDisplay dataFilter={dataFilter} />
}
const ContentFilterByRegion = ({ world, region }) => {
	const dataFilter = world.filter((item) => item.region.includes(region))

	return <ContentDisplay dataFilter={dataFilter} />
}

export default Contents
