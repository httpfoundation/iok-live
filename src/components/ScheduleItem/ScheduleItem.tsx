import { DatoSpeaker } from "../../types"
//import "./ScheduleItem.scss"
import { styled } from '@mui/system'
import { ScheduleTimeCaption } from ".."
import { useTalk } from "../../Store"

/* Egy napirendi pont komponense */

const TalkTitle = styled('div')`
		color: #000;
		transition: all 0.2s ease-out;
		font-size: 1.1rem;
		font-weight: 700;
		padding: 0px 0 1px 0;`

const SpeakerCaption = styled('div')`
		transition: all 0.2s ease-out;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.5);`

const Description = styled('div')`
		transition: all 0.2s ease-out;
		overflow: hidden;
		font-size: 0.9rem;
		max-height: 0;
	`

const Speaker = (props: {speaker: DatoSpeaker}) => {
	const { speaker } = props
	return (
		<SpeakerCaption>
			{`${speaker.name}, ${speaker.title}, ${speaker.company}`}
		</SpeakerCaption>
	)
}

const Speakers = (props: {speakers: DatoSpeaker[] | undefined}) => {
	const { speakers } = props
	return (
		<>
			{speakers?.map((speaker) => (
				<Speaker
					key={speaker.id} speaker={speaker}
				/>
			))}
		</>
	)	
}

const SpeakerImage = styled('div')( (props: {counter: number, speaker: DatoSpeaker}) => `
		width: 100%;
		transition: all 0.2s ease-out;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
		aspect-ratio: 1;
		align-self: center;
		background-image: url(${props.speaker.image?.url});
		transform: translateY(${props.counter*(-7)}px);
`)

const SpeakersImages = (props: {speakers: DatoSpeaker[] | undefined}) => {
	const { speakers } = props
	const SpeakersImagesDiv = styled('div')`
		width: 70px;
		display: inline-block;
		align-self: center;
		vertical-align: middle;
		transition: all 0.2s ease-out;
	`
	return (
		<SpeakersImagesDiv>
			{speakers?.map((speaker, index) => (
				<SpeakerImage key={speaker.id} speaker={speaker} counter={index} />
			))}
		</SpeakersImagesDiv>
	)
}

const Abstract = (props: {abstract?: String }) => {
	const { abstract } = props
	return (
		<Description>{abstract}</Description>
	)
}

const ScheduleItemContent = styled('div')`
	transition: all 0.2s ease-out;
	display: inline-block;
	padding-left: 20px;
	width: calc(100% - 70px);
	vertical-align: top;
`

const ScheduleItemContainer = styled('div')`
	margin: 15px 0;
	transition: all 0.2s ease-out;
	padding: 10px;
	border-radius: 40px;
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`


const ScheduleItem = (props: {
	open: boolean,
	//talk: DatoTalk,
	talkId: number
}) => {
	const talk = useTalk(props.talkId)
	

	return (
		<ScheduleItemContainer>
			<SpeakersImages speakers={talk?.speakers} /> 
			<ScheduleItemContent>
				<ScheduleTimeCaption date={talk?.start} />
				<TalkTitle>{talk?.title}</TalkTitle>
				<Speakers speakers={talk?.speakers} />
				<Abstract abstract={talk?.description} />
			</ScheduleItemContent>
		</ScheduleItemContainer>
	)
}

export default ScheduleItem