import { Box as MuiBox, Container as MuiContainer } from '@mui/material'

const PageContainer = (props: { children: React.ReactNode, container?: boolean, dark?: boolean }) => {
	const Parent = (props.container ? MuiContainer : MuiBox) as React.ElementType
	return (
		<Parent sx={{p: 4, pt: 2, backgroundColor: props.dark ? "#14475C" : "secondary.light", minHeight: '100%'}}>
			{props.children}
		</Parent>
	)
}

/* const Box = styles(MuiBox)`

` */


export default PageContainer


