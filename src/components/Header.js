import React from 'react'

import { MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../styles-components/themesContext'
import { themes } from '../styles-components/themesContext'

const DarkMod = () => {
	const [theme, setTheme] = useTheme()

	const handleDarkMod = () => {
		theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light)
	}

	return (
		<>
			<button onClick={handleDarkMod}>
				<MoonIcon className={`${theme.iconColor} h-16`} />
			</button>
			<p>{theme === themes.light ? 'Light Mode' : 'Dark Mode'}</p>
		</>
	)
}

const Header = () => {
	const [theme] = useTheme()

	return (
		<header
			className='flex justify-between flex-row items-center p-6'
			style={{ backgroundColor: theme.backgroundSd }}>
			<div>
				<h1 className='text-5xl'>Where in the world?</h1>
			</div>
			<div className='w-64 text-center'>
				<DarkMod />
			</div>
		</header>
	)
}

export default Header
