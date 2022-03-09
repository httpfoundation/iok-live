import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
		  main: '#ff6d00',
		  contrastText: '#fff',
		},
		secondary: {
		  main: '#14475C',
		  dark: '#14475C',
		  light: '#d6f4f5',		  
		  contrastText: '#fff',
		},
		info: {
		  main: '#f18c4e'
		},
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: '#14475C'
		},
	},
	typography: {
		//fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontFamily: '"Spartan", sans-serif',
		fontSize: 13.5,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		body1: {
			color: '#14475C',
		},
		h1: {
			fontSize: '45px',
			fontWeight: 700,
			color: '#14475C',
		},
		h6: {
			fontSize: '18px',
			fontWeight: 400,
		}

	},
})

theme = responsiveFontSizes(theme)

export default theme