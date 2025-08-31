'use client'

import { createTheme, PaletteOptions } from '@mui/material'
import { roboto } from './fonts'
import { ThemeMode } from '../types/types'

const darkPalette: PaletteOptions = {
	mode: 'dark',
	secondary: {
		main: '#9e9e9e',
		light: '#bdbdbd',
		dark: '#616161',
		contrastText: '#fff',
	},
	background: {
		default: '#121212',
		paper: '#1e1e1e',
	},
	text: {
		primary: '#ffffff',
		secondary: 'rgba(255, 255, 255, 0.7)',
	},
	divider: 'rgba(255, 255, 255, 0.2)',
}

const lightPalette: PaletteOptions = {
	mode: 'light',
	secondary: {
		main: '#6b7280',
		light: '#9ca3af',
		dark: '#374151',
		contrastText: '#fff',
	},
	background: {
		default: '#f3f4f5',
		paper: '#fafafa',
	},
	text: {
		primary: 'rgba(0, 0, 0, 0.9)',
		secondary: 'rgba(0, 0, 0, 0.65)',
	},
	divider: 'rgba(0, 0, 0, 0.35)',
}

export const createAppTheme = (mode: ThemeMode) => {
	return createTheme({
		palette: mode === 'dark' ? darkPalette : lightPalette,
		typography: {
			fontFamily: roboto.style.fontFamily,
			fontWeightRegular: 400,
			fontWeightMedium: 500,
			fontWeightBold: 700,
		},
	})
}
export default createAppTheme
