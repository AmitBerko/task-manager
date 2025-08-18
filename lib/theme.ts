'use client'

import { createTheme } from '@mui/material'
import { roboto } from './fonts'

const theme = createTheme({
	typography: {
		fontFamily: roboto.style.fontFamily,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	palette: {
		mode: 'dark',
		// Updated secondary to be gray
		secondary: {
			main: '#9e9e9e', 
			light: '#bdbdbd', 
			dark: '#616161', 
			contrastText: '#fff',
		},
    background: {
      default: 'rgb(24, 24, 24)',
      paper: 'rgb(50, 50, 50)',
    },
	},
})

export default theme
