import { CircularProgress, Container, Box, Grid, AppBar, Typography } from '@mui/material'
import { lazy, Suspense, useEffect, useState } from 'react'
import { BackButton, PageContainer } from '../../components'
import Dashboard from '../../components/Dashboard'
import { useRegistration } from '../../Store'
import { DashboardItemType } from "../../types"

import iokCafe from "../../assets/images/iokcafe.png"
import { useNavigate } from 'react-router-dom'

const WebexWidget = lazy(() => import('./WebexWidget'))	

type WebexRoom = {
	id: string,
	title: string
}

const Loader = (props: {size?: number}) => <Box sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress size={props.size || 60}  /></Box>

type WebexRoomDashboardItem = DashboardItemType
const BreakoutRoom = () => {

	const [registration] = useRegistration()
	
	const [rooms, setRooms] = useState<WebexRoom[]>([])
	const [selectedRoom, setSelectedRoom] = useState<WebexRoom|null>(null)
	const [meetingDestination, setMeetingDestination] = useState<string|null>(null)
	const [meetingDestinationLoading, setMeetingDestinationLoading] = useState(false)
	const [roomsLoading, setRoomsLoading] = useState(true)

	useEffect(() => {
		fetch("https://webexapis.com/v1/rooms", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + registration?.webex_access_token,
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			setRooms(data.items)
			setRoomsLoading(false)
		})
	}, [])

	useEffect(() => {
		if (selectedRoom) {
			setMeetingDestination(null)
			setMeetingDestinationLoading(true)
			fetch("https://webexapis.com/v1/rooms/" + selectedRoom.id + "/meetingInfo", {
				method: "GET",
				headers: {
					"Authorization": "Bearer " + registration?.webex_access_token,
					"Content-Type": "application/json"
				}
			}).then(res => res.json()).then(data => {
				setMeetingDestinationLoading(false)
				setMeetingDestination(data.meetingLink)
			})
		}
	}, [selectedRoom])

	const navigate = useNavigate()

	const dashboardItems: WebexRoomDashboardItem[] = rooms.map(room => ({
		caption: room.title,
		title: "",
		light: true,
		img: iokCafe,
		corner: "none",
		onClick: () => {
			setSelectedRoom(room)
			navigate("/iok-cafe/webex")
		},
	}))

	if (meetingDestination) console.log("Meeting destination:", meetingDestination)

	return (
		<>
			{roomsLoading && <Loader />}
			{!roomsLoading && !meetingDestinationLoading && !meetingDestination ? <PageContainer container><Dashboard items={dashboardItems} /></PageContainer> : null}
			{meetingDestinationLoading || meetingDestination ? 
				<Grid container sx={{width: '100%', height: '100%'}}>
					<Grid item xs={12} lg={9} sx={{maxHeight: '100%', position: 'relative', backgroundColor: "#171717"}}>
						<Suspense fallback={<Box sx={{width: '100%', height: '100%'}}><Loader size={60} /></Box>} ><WebexWidget destination={meetingDestination} /></Suspense>
					</Grid>
					<Grid item xs={12} lg={3}>
						<Box sx={{display: 'flex', flexDirection: 'column', maxHeight: 'calc(100%)', height: '100%', position: 'relative'}}>
							<AppBar component="div" position="static" color="default" sx={{px: 2, bgcolor: "#ace8ea"}} elevation={1}>
								<BackButton />
								<h1>
									{selectedRoom?.title}
								</h1>
							</AppBar>
							<Typography variant="body1" sx={{p: 3}}>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium veritatis illo earum asperiores minus dolor? Laudantium inventore magnam laborum velit quia sapiente maxime, accusamus nesciunt animi illum fuga, rerum numquam exercitationem dolores. Ut, illo? Rerum minus nam atque at esse.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			: null}
		</>
	)
}

export default BreakoutRoom