import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { Box, Button, CircularProgress, CssBaseline, Divider, TextField, Tooltip, Typography, Paper } from '@mui/material'

import { BrowserRouter, useSearchParams } from "react-router-dom"
import Main from '../components/Main'
import Header from '../components/Header'
import { StoreProvider, useRegistration } from '../Store'
import React, { useState, useEffect, FormEvent } from 'react'
import { Login as LoginIcon } from '@mui/icons-material'

import NagyEloado from '../assets/images/nagyeloado.png'

const App = () => {

	return (
		<ThemeProvider theme={theme}>
			<StoreProvider>
				<BrowserRouter>
					<RegistrationLoadSpinner>
						<CssBaseline />
						<Header />
						<Main />
					</RegistrationLoadSpinner>
				</BrowserRouter>
			</StoreProvider>
		</ThemeProvider>
	)
}

const NoRegistration = () => {

	const [id, setId] = useState('')

	const login = (e: React.FormEvent) => {
		e.preventDefault()
		window.location.href = window.location.origin + window.location.pathname + "?q=" + id
	}

	return <Paper elevation={10} sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#15485B', p:4, color: '#fff', borderRadius: '8px', textAlign: 'center', width: '600px', maxWidth: '100%'}}>
		<Typography variant="h5" sx={{fontWeight: 'bold', mb: 4}}>
			A konferencián való részvétel regisztrációhoz kötött!
		</Typography>
		<img src={NagyEloado} alt="" style={{width: '200px', maxWidth: '70%'}}/>
		<Typography variant="body1" component="p" sx={{color: '#fff', my: 1}}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi consectetur ex dolorem quos porro delectus quia totam, officia maiores.
		</Typography>

		<Button variant="contained" color="primary" sx={{mt: 2}} size="large" href="https://iok2022.http-alapitvany.hu/#regisztracio">Regisztráció</Button>

		<Divider color="#fff" sx={{my: 4}} />
		<Typography variant="body1" component="p" sx={{color: '#fff', fontSize: '0.9rem', mb: 1, mt: 2}}>
			Amennyiben már regisztráltál, kattints az e-mailben kapott linkre, vagy add meg az egyedi kódodat:
		</Typography>
		<form onSubmit={login}>
			<TextField value={id} onChange={e=>setId(e.target.value)} placeholder='Egyedi kód' sx={{width: '300px', 'input': {color: '#fff', textAlign: 'center',}, 'fieldset': {borderColor: '#fff !important'}}} />
			<Tooltip title="Belépés" arrow placement="right">
				<Button type="submit" variant="contained" color="primary" sx={{ml: 1, mt: '6px', height: '49px'}}><LoginIcon sx={{transform: 'translateX(-2px)'}} /></Button>
			</Tooltip>
		</form>
	</Paper>
}

const RegistrationLoadSpinner = (props: {children: React.ReactNode}) => {
	const [registration, loading] = useRegistration()

	console.log("REGISTRATION", registration)

	
	if (loading) return <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress color="secondary" size={60} /></Box>
	if (!registration) return <NoRegistration />
	return props.children as JSX.Element

}

export default App
