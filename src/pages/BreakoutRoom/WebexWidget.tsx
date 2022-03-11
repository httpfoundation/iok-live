import { WebexMeetingsWidget } from '@webex/widgets'
import '@webex/widgets/dist/css/webex-widgets.css'
import { useBreakoutRooms, useRegistration } from '../../Store'

enum MeetingControl {
	JOIN = 'join-meeting',
	EXIT = 'leave-meeting',
	AUDIO = 'mute-audio',
	VIDEO = 'mute-video',
	SHARE = 'share-screen',
	ROSTER = 'member-roster',
	SETTINGS = 'settings',
	SWITCH_CAMERA = 'switch-camera',
	SWITCH_MICROPHONE = 'switch-microphone',
	SWITCH_SPEAKER = 'switch-speaker',
}

export const WebexWidget = () => {

	const inMeetingControls: MeetingControl[] = [MeetingControl.EXIT, MeetingControl.AUDIO, MeetingControl.VIDEO, MeetingControl.SETTINGS]
	//const outOfMeetingControls: MeetingControl[] = [MeetingControl.AUDIO, MeetingControl.VIDEO, MeetingControl.SETTINGS, MeetingControl.JOIN]
	const outOfMeetingControls: MeetingControl[] = [MeetingControl.AUDIO, MeetingControl.VIDEO, MeetingControl.JOIN]
	const breakoutRooms = useBreakoutRooms()
	const {meetingDestination }= breakoutRooms[0] ?? {meetingDestination: ""}
	console.log("meetingDestination", meetingDestination)

	//alert(meetingDestination)

	const [registration] = useRegistration()

	return (
		<>
		<style>
			{`.wxc-meeting-info:after {
				content: "IOK Cafe";
			 }
			 .wxc-button--join:after {
				content: "Jövök én is beszélgetni!";
				font-family: Arial, sans-serif;
			 }	
			`}
		</style>
		{ 
			registration?.webex_access_token &&
			<WebexMeetingsWidget
				style={{width: "100%", height: "100%"}}
				accessToken={registration.webex_access_token}
				meetingDestination={meetingDestination}
				controls={(inMeeting: boolean) => inMeeting ? inMeetingControls : outOfMeetingControls}
			/>
			}
		</>
	)
}

export default WebexWidget
