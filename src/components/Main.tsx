import Box from '@mui/material/Box'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ display: 'flex', pt: '64px' }} component="main">
			<Router />
		</Box>
	)
}

export default Main