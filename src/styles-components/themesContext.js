import React from 'react'
import { light, dark } from './themes'

export const themes = {
	light,
	dark,
}

const ThemeContext = React.createContext(themes.light)

export const ThemeProvider = (props) => {
	const [local, setLocal] = React.useState(
		() => window.localStorage.getItem('theme') || null
	)
	const [theme, setTheme] = React.useState(() => {
		if (local) {
			return local === 'light' ? themes.light : themes.dark
		} else {
			setLocal('light')
			return themes.light
		}
	})

	React.useEffect(() => {
		const result = theme === themes.light ? 'light' : 'dark'
		window.localStorage.setItem('theme', result)
	}, [theme])

	return (
		<ThemeContext.Provider
			value={[theme, setTheme]}
			{...props}
		/>
	)
}

export const useTheme = () => {
	const context = React.useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme doit etre dans ThemeProvider')
	}
	return context
}
