/*
	General Bubble component
*/

import { styled } from '@mui/material/styles'

interface BubbleProps {
	title?: string,
	subtitle?: string,
	corner?: ('bl' | 'br' | 'tl' | 'tr'),
	size?: 'xs' | 'lg' | 'xl' | 'xxl',
	color?: 'light' | 'primary',
	shadow?: boolean,
	smallText?: boolean,
	darkText?: boolean,
	icon?: boolean,
	children?: React.ReactNode
}

interface BubbleWrapperProps {
	bubbleWrapperProps: {
		width : string
		borderBottomRightRadius: string
		borderBottomLeftRadius: string
		borderTopRightRadius: string
		borderTopLeftRadius: string
	}
}

const Bubble = (props: BubbleProps) => {
	const { size, corner } = props
	//"lg" is the default size
	const width = (size === "xs") ? "150px" : (size === "xl") ? "250px" : (size === "xxl") ? "350px" : "210px"
	const borderRadius = (size === "xs") ? "90px" : (size === "xl") ? "150px" : (size === "xxl") ? "210px" : "125px"
	const bubbleWrapperProps = {
		width,
		borderBottomRightRadius: (corner==="br") ? "0" : borderRadius,
		borderBottomLeftRadius: (corner==="bl") ? "0" : borderRadius,
		borderTopRightRadius: (corner==="tr") ? "0" : borderRadius,
		borderTopLeftRadius: (corner==="tl") ? "0" : borderRadius,
	}

	
	return (
		<BubbleWrapper bubbleWrapperProps={bubbleWrapperProps}>
			<BubbleContent>
				<BubbleTitle>
					{props.title}
				</BubbleTitle>
					{props.children}
			</BubbleContent>
		</BubbleWrapper>
	)
}


const BubbleWrapper = styled("div", { shouldForwardProp: (propName) => propName !== "bubbleWrapperProps" })<BubbleWrapperProps>(({ theme, bubbleWrapperProps } ) => `
	border: 2px solid ${theme.palette.secondary.main};
	display: inline-block;
	position: relative;
	aspect-ratio: 1;
	background-color: ${theme.palette.secondary.dark};
	transition: transform .2s;
	/* ...bubbleWrapperProps */
	width: ${bubbleWrapperProps.width};
	border-bottom-right-radius: ${bubbleWrapperProps.borderBottomRightRadius};
	border-bottom-left-radius: ${bubbleWrapperProps.borderBottomLeftRadius};
	border-top-right-radius: ${bubbleWrapperProps.borderTopRightRadius};
	border-top-left-radius: ${bubbleWrapperProps.borderTopLeftRadius};
	&:hover {
		transform: scale(1.1)
	}
`)

const BubbleContent = styled('div') 
	(( {theme} ) => (
		{
			position: "absolute",
			top: '50%',
			left: "50%",
			transform: "translate(-50%, -50%)",
			textAlign: "center",
			width: "150px"
		}
	))

const BubbleTitle = styled('div')
(( {theme} ) => (
	{
		color: theme.palette.primary.main,
		fontWeight: "bold",
		fontSize: "1.5rem",
		svg: {
			fill: theme.palette.info.main
		}
	}
))

export default Bubble