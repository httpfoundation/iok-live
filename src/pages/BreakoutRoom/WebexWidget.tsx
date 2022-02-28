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
	const outOfMeetingControls: MeetingControl[] = [MeetingControl.AUDIO, MeetingControl.VIDEO, MeetingControl.SETTINGS, MeetingControl.JOIN]

	return (
		<WebexMeetingsWidget
			style={{width: "100%", height: "100%"}}
			accessToken="MmQ3NWZkOTgtYzcxZS00NWVmLWE2ZmEtYWZiZDNhNjEwMWZjYWE0MDAxNDgtODU4_PF84_4a05e5c1-65cb-4f86-899f-dbcc12a1af24"
			meetingDestination="botond.sisak@http-foundation.hu"
			controls={(inMeeting: boolean) => inMeeting ? inMeetingControls : outOfMeetingControls}
		/>
	)
}

export default WebexWidget