import { Box } from '@mui/material'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ mt: {xs: '56px', md: '64px'}, overflowY: 'auto', height: {xs: 'calc(100% - 56px)', md: 'calc(100% - 64px)'} }} component="main" id="main">
			<Router />
		</Box>
	)
}

export default Main