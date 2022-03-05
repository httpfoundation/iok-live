import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
		  main: '#ff6d00',
		},
		secondary: {
		  main: '#47ccd4',
		  contrastText: '#fff',
		},
		info: {
		  main: '#14475c',
		},
	},
	typography: {
		//fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontFamily: '"Spartan", sans-serif',
		fontSize: 13.5,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		h1: {
			fontFamily: '"Spartan", sans-serif',
			fontSize: '32px',
			fontWeight: 700,
		},
		h6: {
			fontFamily: '"Spartan", sans-serif',
			fontSize: '18px',
			fontWeight: 400,
		},
		body1: {
			fontWeight: 500,
		}

	},
})

export default theme