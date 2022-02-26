import Box from '@mui/material/Box'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ mt: '64px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }} component="main">
			<Router />
		</Box>
	)
}

export default Main