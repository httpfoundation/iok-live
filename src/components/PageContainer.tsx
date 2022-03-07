import { Box as MuiBox, Container as MuiContainer } from '@mui/material'

const PageContainer = (props: { children: React.ReactNode, container?: boolean, dark?: boolean }) => {
	const Parent = (props.container ? MuiContainer : MuiBox) as React.ElementType
	return (
		<Parent sx={{px: {md: 4, xs: 2}, pt: 2, pb: {xs: 4, md: 2}, backgroundColor: props.dark ? "#14475C" : "secondary.light", minHeight: '100%'}}>
			{props.children}
		</Parent>
	)
}

export default PageContainer


