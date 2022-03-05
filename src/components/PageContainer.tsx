import { Box, Container } from '@mui/material'

const PageContainer = (props: { children: React.ReactElement|React.ReactElement[], container?: boolean }) => {
	const Parent = (props.container ? Container : Box) as React.ElementType
	return (
		<Parent sx={{p: 4, pt: 2}}>
			{props.children}
		</Parent>
	)
}

export default PageContainer