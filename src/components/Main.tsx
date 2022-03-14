import { Box } from '@mui/material'
import { MessageNotifications } from '../pages/MessageBoard'

import Router from './Router'

const Main = () => {
	return (
		<Box sx={{ mt: {xs: '56px', md: '64px'}, overflowY: 'auto', 
				height: {xs: 'calc(100% - 56px)', md: 'calc(100% - 64px)',
				}, backgroundColor: "secondary.light" }} 
				component="main" id="main">
			<Router />
			<MessageNotifications />
		</Box>
	)
}

export default Main