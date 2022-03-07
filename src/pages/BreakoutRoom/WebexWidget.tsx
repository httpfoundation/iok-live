import { WebexMeetingsWidget } from '@webex/widgets'
import '@webex/widgets/dist/css/webex-widgets.css'
import { useBreakoutRooms } from '../../Store'

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

	return (
		<>
		<style>
			{`.wxc-meeting-info:after {
					content: "ITMP Klub Cafe2";
			 }
			 .wxc-button--join:after {
				content: "Jövök én is beszélgetni!";
				font-family: Arial, sans-serif;
			 }	
			`}
		</style>
		<WebexMeetingsWidget
			style={{width: "100%", height: "100%"}}
			accessToken="ZmZlMzFlOWMtYTEyMS00YjdjLWI3OTMtNDMzNGNlYWE2NmNmMDVjYzVlOWItNjZj_PF84_ff3fdc6f-3153-45d3-a0cc-4be98bfd8371"
			meetingDestination={meetingDestination}
			controls={(inMeeting: boolean) => inMeeting ? inMeetingControls : outOfMeetingControls}
			/* zoltan.sisak@httpf.webex.com" */
		/>
		</>
	)
}

export default WebexWidget
