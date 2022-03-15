import { Card, CardContent, CardHeader, Typography, Avatar, Divider, Slide, Box, IconButton, Chip } from "@mui/material"
import { StructuredText } from "react-datocms"
import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"

import { useMessages } from "../Store"
import { DatoMessage } from "../types"
import { styled } from '@mui/material/styles'
import React, { useEffect } from "react"
import { Close as CloseIcon, AccessTime as TimeIcon } from "@mui/icons-material"

const MessageContainer = styled(Card)<{absolute?: boolean}>(({ theme, absolute }) => `
	padding: 0 0.5rem;
	border-radius: 15px;
	margin-bottom: 25px;
	${absolute ? `
		border-bottom-right-radius: 0;
		h4 {
			font-size: 1.5rem;
		}
		p {
			font-size: 0.9rem !important;
		}
	` : ``}
	p {
		font-size: 1rem;
	}
`)

const notificationTimeout = 10 * 1000

const Message = (props: {message?: DatoMessage, notification?: boolean, onHide?: (id: number) => void}) => {

	const [isIn, setIsIn] = React.useState(true)

	useEffect(() => {
		if (props.message && props.notification) window.setTimeout(() => hideMessage(), notificationTimeout)
	}, [props.message])

	const hideMessage = () => {
		setIsIn(false)
		if (props.onHide && props.message?.id) window.setTimeout(() => props.onHide!(Number(props.message?.id)), 200)
	}



	if (!props.message) return null
	const { title, level, message, staff, createdAt  } = props.message
	const AnimContainer = props.notification ? Slide : (props: {children: React.ReactElement, in?: boolean}) => props.children
	return <AnimContainer in={isIn} direction="left"><MessageContainer absolute={props.notification} elevation={3}>
		
		<CardContent sx={{position: 'relative'}}>
			{props.notification && <IconButton sx={{position: 'absolute', top: '10px', right: '0'}} onClick={() => {
				if (props.onHide) props.onHide(Number(props.message?.id))
			}}>
				<CloseIcon />
			</IconButton>}
			{staff && 
				<CardHeader
				avatar={<Avatar src={staff.image?.url}></Avatar>}
				title={staff.name}
				subheader="HTTP Alapítvány"
				titleTypographyProps={{fontWeight: 600}}
				sx={{pb: 2, px: 0, pt: 1}}
				/>
			}
			<Typography fontWeight={600} sx={{}}>  </Typography>
			{!props.notification && <Chip label={(new Date(createdAt)).toLocaleTimeString('hu-HU', {
				hour: '2-digit',
				minute: '2-digit'
			})} icon={<TimeIcon />} sx={{mb: 2}}/>}
			<Typography variant="h4" fontWeight={700}>
				{title}
			</Typography>
			<StructuredText data={message} />
		</CardContent>
	</MessageContainer>
	</AnimContainer>
}

const MessageBoard = () => {

	const messages = useMessages()

	return (
 		<PageContainer container>
            <PageTitle>Üzenőfal</PageTitle>
			{messages.map((message, index) => <Message key={index} message={message} />)}
		</PageContainer> 
	)
}

export const MessageNotifications = () => {
	const messages = useMessages()

	const [readMessages, setReadMessages] = React.useState<number[]>(JSON.parse(window.localStorage.getItem('readMessages') || '[]'))

	const unreadMessages = messages.filter(message => !readMessages.includes(Number(message.id)))

	console.log(unreadMessages)

	return (
		<Box sx={{
			position: "fixed",
			right: '20px',
			bottom: '0px',
			width: '500px',
			maxWidth: '100%',
		}}>	
		{unreadMessages.map((message, index) => <Message key={index} message={message} notification onHide={(id) => {
			if (!readMessages.includes(id)) {
				window.localStorage.setItem('readMessages', JSON.stringify([...readMessages, id]))
				setReadMessages([...readMessages, id])
			}
		}} />)}
		</Box>
	)
}

export default MessageBoard