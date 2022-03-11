import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { PageContainer } from '../../components'
const WebexWidget = lazy(() => import('./WebexWidget'))	

const BreakoutRoom = () => {
	return (
		<PageContainer title="ITMP Klub Cafe">
			<Suspense fallback={ <CircularProgress sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} /> }>
				<WebexWidget />
			</Suspense>
		</PageContainer>
	)
}

export default BreakoutRoom