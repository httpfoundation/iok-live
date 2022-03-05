import { Box } from '@mui/material'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ mt: {xs: '56px', md: '64px'}, height: {xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)'}, maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} component="main">
			<Router />
		</Box>
	)
}

export default Main