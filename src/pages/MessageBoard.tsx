import { Card, CardContent, CardHeader, Typography, Avatar, Divider } from "@mui/material"
import { StructuredText } from "react-datocms"
import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"

import { useLiveStaticElements, useMessages } from "../Store"
import { DatoMessage } from "../types"

const Message = (props: {message: DatoMessage}) => {
	const { title, level, message, staff  } = props.message
	return <Card sx={{px: 1, borderRadius: '15px', mb: 4, mt: 2}} elevation={3}>
		
		<CardContent>
			
			{staff && 
				<CardHeader
					avatar={<Avatar src={staff.image?.url}></Avatar>}
					title={staff.name}
					subheader="HTTP Alapítvány"
					titleTypographyProps={{fontWeight: 600}}
					sx={{pb: 2, px: 0, pt: 1}}
				/>
			}
			<Typography variant="h4" component="div" fontWeight={700}>
				{title}
			</Typography>
			<StructuredText data={message} />
		</CardContent>
	</Card>
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



export default MessageBoard