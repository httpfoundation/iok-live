/*
	General Bubble component
*/

import { styled } from '@mui/material/styles'
import {Tooltip, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import {Fade as Grow} from '@mui/material'
import { useState } from 'react'

interface BubbleProps {
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
	external?: boolean
	caption?: string,
	timeout?: number,
	title?: string,
	tooltipPlacement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined,
	img?: string,
	hoverImg?: string,
	imgWidth?: string,
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
		caption?: string
	}
}

const LinkOrOnClick = (props: {to?: string, onClick?: () => void, children: React.ReactElement, external?: boolean}) => {
	const {to, onClick, external} = props
	const style = {display: 'block', width: '100%', height: '100%', cursor:'pointer'}
	if (to) {
		if (external) return <a target="_blank" rel="noreferrer noopener" href={to} style={style}>{props.children}</a>
		else return <Link style={style} to={to}>{props.children}</Link>
	}
	if (onClick) {
		return <div style={style} onClick={onClick}>{props.children}</div>
	}
	return <div>{props.children}</div>
}

const Bubble = (props: BubbleProps) => {
	const { size, corner, timeout, caption, title, tooltipPlacement, img, imgWidth, hoverImg, external } = props
	//"xl" is the default size
 	const width = (size === "xs") ? "350px" : (size === "lg") ? "200px" :  "450px"
	const borderRadius = (size === "xs") ? "250px" : (size === "lg") ? "140px" : "350px" 
	const [image, setImage] = useState(img)
	
	const bubbleWrapperProps = {
		width,
		borderBottomRightRadius: (corner==="br") ? "0" : borderRadius,
		borderBottomLeftRadius: (corner==="bl") ? "0" : borderRadius,
		borderTopRightRadius: (corner==="tr") ? "0" : borderRadius,
		borderTopLeftRadius: (corner==="tl") ? "0" : borderRadius,
		light: props.light
	}
	return (
		<Tooltip title={title ?? ""} placement={tooltipPlacement ?? "top"} arrow  >
			<BubbleWrapper bubbleWrapperProps={bubbleWrapperProps} onMouseEnter = {() => {if (hoverImg) setImage(hoverImg)}} onMouseLeave={() => {if (hoverImg) setImage(img)}}>
				<LinkOrOnClick external={external} to={props.to} onClick={props.onClick}>
					<Grow in style={{ transformOrigin: '0 0 0' }}
							{...{timeout : timeout}} >
							<BubbleContent>
							
								<BubbleImage src={image} alt={caption} width={imgWidth} size={size}/>
								
							
							{/* 	{props.children} */}
								<BubbleCaption sx={{color:"primary.contrastText", minHeight:"38px", fontWeight:"500", margin:"auto", width:"85%"}}>
									{caption}
								</BubbleCaption>					
							</BubbleContent>
					</Grow>
				</LinkOrOnClick>
			</BubbleWrapper>
		</Tooltip>
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
			transition: "transform 0.2s, box-shadow 0.2s ",
			...bubbleWrapperProps,
			"&:hover": {
				transform: "scale(1.1)",
				boxShadow: '0 .2rem 1.5rem rgba(0,0,0,.15)!important'
			},
			boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important'
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

const BubbleCaption = styled(Typography)
(( {theme} ) => (
	{
		color: theme.palette.primary.main,
		fontWeight: "300",
	}
))

const BubbleImage = styled("img", {shouldForwardProp: (prop) => prop!=='width' && prop!=='size' })<{width?: string, size?: string}>
	( ({theme, width, size}) => {
		if (width) return width
		else return (
			{
				width: (size==="xl") ? "140px" : (size==="lg") ? "100px" : "100%"
			}
		)	
	})


export default Bubble