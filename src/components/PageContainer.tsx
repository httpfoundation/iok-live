import { Box, Container } from '@mui/material'

const PageContainer = (props: { children: React.ReactNode, container?: boolean, dark?: boolean }) => {
	const Parent = (props.container ? Container : Box) as React.ElementType
	return (
		<Parent sx={{p: 4, pt: 2, backgroundColor: props.dark ? "#14475C" : "inherit", minHeight: '100%'}}>
			{props.children}
		</Parent>
	)
}

export default PageContainer