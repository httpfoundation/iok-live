/*
	General Bubble component
*/

import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

interface BubbleProps {
	title?: string,
	subtitle?: string,
	corner?: 'bl' | 'br' | 'tl' | 'tr' | 'none',
	size?: 'xs' | 'lg' | 'xl' | 'xxl',
	color?: 'light' | 'primary',
	shadow?: boolean,
	smallText?: boolean,
	darkText?: boolean,
	icon?: boolean,
	children?: React.ReactNode,
	light? : boolean,
	to?: string,
	onClick?: () => void,
}

interface BubbleWrapperProps {
	bubbleWrapperProps: {
		width : string
		borderBottomRightRadius: string
		borderBottomLeftRadius: string
		borderTopRightRadius: string
		borderTopLeftRadius: string
		light? : boolean
	}
}

const LinkOrOnClick = (props: {to?: string, onClick?: () => void, children: React.ReactElement}) => {
	const {to, onClick} = props
	const style = {display: 'block', width: '100%', height: '100%', cursor:'pointer'}
	if (to) {
		return <Link style={style} to={to}>{props.children}</Link>
	}
	if (onClick) {
		return <div style={style} onClick={onClick}>{props.children}</div>
	}
	return <div>{props.children}</div>
}

const Bubble = (props: BubbleProps) => {
	const { size, corner } = props
	//"lg" is the default size
 	const width = (size === "xs") ? "150px" : (size === "lg") ? "180px" : (size === "xl") ? "200px" : "350px"
	const borderRadius = (size === "xs") ? "90px" : (size === "xl") ? "250px" : (size === "xxl") ? "300px" : "125px"
	const bubbleWrapperProps = {
		width,
		borderBottomRightRadius: (corner==="br") ? "0" : borderRadius,
		borderBottomLeftRadius: (corner==="bl") ? "0" : borderRadius,
		borderTopRightRadius: (corner==="tr") ? "0" : borderRadius,
		borderTopLeftRadius: (corner==="tl") ? "0" : borderRadius,
		light: props.light
	}

	
	return (
		<BubbleWrapper bubbleWrapperProps={bubbleWrapperProps}>
			<LinkOrOnClick to={props.to} onClick={props.onClick}>
				<BubbleContent>
					<BubbleTitle>
						{props.title}
					</BubbleTitle>
						{props.children}
				</BubbleContent>
			</LinkOrOnClick>
		</BubbleWrapper>
	)
}


const BubbleWrapper = styled("div", 
			{
				shouldForwardProp: (prop) => 
					prop!=='bubbleWrapperProps' 
			})	
			<BubbleWrapperProps>
	(( {theme, bubbleWrapperProps} ) => (
		{
			//border: `2px solid ${theme.palette.secondary.main}`,
			display: "inlineBlock",
			position: "relative",
			aspectRatio: "1",
			backgroundColor: (bubbleWrapperProps.light) ? theme.palette.info.main :theme.palette.secondary.dark,
			transition: "transform .2s",
			...bubbleWrapperProps,
			"&:hover": {
				transform: "scale(1.1)"
			}
		}
	))


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