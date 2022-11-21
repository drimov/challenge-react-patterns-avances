import React from 'react'
import {
	MagnifyingGlassIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { useTheme } from '../styles-components/themesContext'

const regionsList = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const Filters = ({ search, region, handleRegion, handleSearchChange }) => {
	const [theme] = useTheme()

	return (
		<div
			className='flex flex-col sm:flex-row justify-between px-10 h-16 my-24 md:my-10'
			style={{
				backgroundColor: theme.backgroundP,
			}}>
			<SearchBar
				search={search}
				handleSearchChange={handleSearchChange}
			/>
			<FilterBar handleRegion={handleRegion}>
				<FilterButton>
					{`Filter by Region : ${region ? region : 'All'}`}
				</FilterButton>
				<RegionList>
					{regionsList.map((regionItem, idReg) => (
						<Region key={idReg}>{regionItem}</Region>
					))}
					{region !== 'All' ? <Region key={'All'} /> : null}
				</RegionList>
			</FilterBar>
		</div>
	)
}

const SearchBar = ({ search, handleSearchChange }) => {
	const [theme] = useTheme()
	const { getSearchProps } = useSearchBar()

	return (
		<div
			className='search-bar flex flex-row rounded-md items-center my-2 md:m-0'
			style={{ backgroundColor: theme.backgroundSd }}>
			<MagnifyingGlassIcon className={`h-10 m-3 hidden md:block`} />
			<input
				{...getSearchProps({
					search,
					onChange: (e) => handleSearchChange(e.target.value),
				})}
			/>
		</div>
	)
}

const executeFunc =
	(...functions) =>
	(...args) => {
		functions.forEach((func) => func?.(...args))
	}
const useSearchBar = () => {
	const [theme] = useTheme()

	const getSearchProps = ({ onChange, value } = {}) => {
		return {
			type: 'text',
			placeholder: 'Search for a country...',
			className: 'text-xl md:m-3 w-min rounded-md m-3',
			onChange: executeFunc(onChange),
			value: value,
			style: { backgroundColor: theme.backgroundSd },
		}
	}

	return {
		getSearchProps,
	}
}

const FilterContext = React.createContext()

const useFilter = () => {
	const context = React.useContext(FilterContext)
	if (!context)
		throw new Error(
			`useFilter doit être appeler par le composant FilterBarParent.`
		)
	return context
}
const FilterBar = ({ children, handleRegion, ...props }) => {
	const [theme] = useTheme()
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(!open)
	}

	return (
		<FilterContext.Provider
			value={{ theme, open, handleOpen, handleRegion, ...props }}>
			<div
				className='relative flex flex-col w-70 rounded-md'
				style={{
					backgroundColor: theme.backgroundSd,
				}}>
				{children}
			</div>
		</FilterContext.Provider>
	)
}

const FilterButton = ({ children }) => {
	const { handleOpen, open } = useFilter()
	return (
		<div className='region-button flex flex-row items-center rounded-md px-2 m-2 md:m-0'>
			<button
				onClick={handleOpen}
				className='text-xl my-4 mx-2'>
				{children}
			</button>
			<ChevronRightIcon
				className={`h-5 ${open ? 'arrow-down' : 'arrow-init'}`}
			/>
		</div>
	)
}

const RegionList = ({ children }) => {
	const { handleRegion, theme, open, ...props } = useFilter()

	const clone = React.Children.map(children, (child, keyId) =>
		child === null
			? child
			: React.cloneElement(child, {
					handleRegion: handleRegion,
					keyId: keyId,
					theme: theme,
					...props,
			  })
	)
	if (open)
		return (
			<div
				className='region-select flex my-2 rounded-md'
				style={{ backgroundColor: theme.backgroundSd }}>
				<ul className='menu-region mt-4'>{clone}</ul>
			</div>
		)
}
const Region = ({ children = 'All', key }) => {
	const { handleRegion } = useFilter()
	return (
		<li
			key={key}
			className='m-1 mx-3 item-region'
			onClick={(e) => handleRegion(children, e)}>
			{children}
		</li>
	)
}

export default Filters
