import { Box } from '@mui/material'

const PageContainer = (props: { children: React.ReactElement|React.ReactElement[] }) => {
	return (
		<Box sx={{p: 4, pt: 2}}>
			{props.children}
		</Box>
	)
}

export default PageContainer