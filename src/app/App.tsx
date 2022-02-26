import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import CssBaseline from '@mui/material/CssBaseline'

import { BrowserRouter } from "react-router-dom"
import Main from '../components/Main'
import Header from '../components/Header'


const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				
				<Header />
				<Main />
  			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
