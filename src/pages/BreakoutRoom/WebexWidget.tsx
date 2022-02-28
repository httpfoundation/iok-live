import { WebexMeetingsWidget } from '@webex/widgets'
import '@webex/widgets/dist/css/webex-widgets.css'

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
	const outOfMeetingControls: MeetingControl[] = [ MeetingControl.JOIN]

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
			accessToken="MmQ3NWZkOTgtYzcxZS00NWVmLWE2ZmEtYWZiZDNhNjEwMWZjYWE0MDAxNDgtODU4_PF84_4a05e5c1-65cb-4f86-899f-dbcc12a1af24"
			meetingDestination="https://httpf.webex.com/httpf-en/j.php?MTID=m4579dffac778ac13952996c4e65ad608" 
			controls={(inMeeting: boolean) => inMeeting ? inMeetingControls : outOfMeetingControls}
			/* zoltan.sisak@httpf.webex.com" */
		/>
		</>
	)
}

export default WebexWidget
