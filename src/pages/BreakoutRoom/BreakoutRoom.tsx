import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
const WebexWidget = lazy(() => import('./WebexWidget'))	

const BreakoutRoom = () => {
	return (
		<Suspense fallback={ <CircularProgress sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} /> }>
			<WebexWidget />
		</Suspense>
	)
}

export default BreakoutRoom