import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { CssBaseline } from '@mui/material'

import { BrowserRouter } from "react-router-dom"
import Main from '../components/Main'
import Header from '../components/Header'
import { StoreProvider } from '../Store'


const App = () => {

	return (
		<ThemeProvider theme={theme}>
			<StoreProvider>
				<BrowserRouter>
					<CssBaseline />
					
					<Header />
					<Main />
				</BrowserRouter>
			</StoreProvider>
		</ThemeProvider>
	)
}

export default App
