import { DatoSpeaker, DatoTalk } from "../../types"
import "./ScheduleItem.scss"
import { styled } from '@mui/system';
import { ScheduleTimeCaption } from "..";

/* Egy napirendi pont komponense */

const TalkTitle = styled('div')`
		transition: all 0.2s ease-out;
		font-size: 1.1rem;
		font-weight: 700;
		padding: 0px 0 1px 0;`

const SpeakerCaption = styled('div')`
		transition: all 0.2s ease-out;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.5);`

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

const SpeakerImage = (props: {speaker: DatoSpeaker, key: number, counter: number} ) => {
	const speakerImageUrl = props.speaker.image?.url
	const {counter} = props
	console.log("tr", counter)
	const SpeakerImageDiv = styled('div')`
		width: 100%;
		transition: all 0.2s ease-out;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
		aspect-ratio: 1;
		align-self: center;
		background-image: url(${speakerImageUrl});
		transform: translateY(${counter*(-7)}px);
	`	
	return (
		<SpeakerImageDiv />
	)
}

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

const Abstract = (props: {abstract: String}) => {
	const { abstract } = props
	return (
		<Description>{abstract}</Description>
	)
}

const ScheduleItemContent = styled('div')`
	transition: all 0.2s ease-out;
	display: inline-block;
	padding-left: 20px;
	width: calc(100% - 200px);
	vertical-align: top;
	`


const ScheduleItem = (props: {
	open: boolean
	talk: DatoTalk
}) => {
	const double = false

	const { talk } = props

	return (
		<div
			className={`shcedule-item ${props.open ? "open" : ""} ${double ? "double-presenter" : ""}`}
			//onClick={props.onClick}
		>
			<SpeakersImages speakers={props.talk.speaker} /> 
			<ScheduleItemContent>
				<ScheduleTimeCaption date={talk?.start} />
				<TalkTitle>{talk?.title}</TalkTitle>
				<Speakers speakers={talk?.speaker} />
				<Abstract abstract={talk?.description} />
			</ScheduleItemContent>
		</div>
	)
}

export default ScheduleItem