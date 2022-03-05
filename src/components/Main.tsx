import { Box } from '@mui/material'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ mt: '64px', height: 'calc(100vh - 64px)', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} component="main">
			<Router />
		</Box>
	)
}

export default Main