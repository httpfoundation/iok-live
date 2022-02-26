import Grid from "@mui/material/Grid"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { useParams } from "react-router-dom"
import useQuery from "../../useQuery"
import { DatoLanguage, DatoStage, DatoStream } from "../../types"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import LanguageIcon from '@mui/icons-material/Language'
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

const StagePage = () => {

	const { stageId } = useParams()

	const [stage] = useQuery<DatoStage>(`
		{
			stage(filter: {slug: {eq: "${stageId}"}}) {
				id
				name
				streams {
					id
					name
					youtubeVideoId
					language {
						id
						name
						slug
					}
				}
				schedule {
					id
					title
					start
					speaker {
						id
						name
						title
						company
						image {
							url
						}
					}
				}
			}
	  	}
	`, {} as DatoStage)

	useEffect(() => {
		if (stage?.streams?.length) {
			setSelectedStream(stage.streams[0])
		}
	}, [stage])

	const [selectedStream, setSelectedStream] = useState<DatoStream| null>(null)

	return (
		<Grid container spacing={0} id="stage">
			<Grid item xs={9} className="embed-video-row">
				{ selectedStream?.youtubeVideoId && <YouTubeVideo
					videoId={selectedStream.youtubeVideoId}
					containerClassName="embed-video"
					className="embed-video-inner"
					opts={{
						playerVars: {
							autoplay: 1,
							hl: 'hu',
							//modestbranding: 1,
							rel: 0,
							color: 'red',
							controls: 1,
							showinfo: 0,
							loop: 1,
							origin: window.location.origin,
						}
					}}
				/>}
			</Grid>
			<Grid item xs sx={{px: 3}} className="sidebar">
				<h1>
					{stage.name}
				</h1>
				<LanguageSelect
					value={selectedStream?.language.id ?? null}
					onChange={(languageId) => setSelectedStream(stage?.streams?.find(stream => stream.language.id === languageId) ?? null)}
					options={stage?.streams?.map(stream => stream.language)}
				/>
				{ stage?.schedule?.map(talk => <ScheduleItem open key={talk.id} talk={talk} />) }
			</Grid>
		</Grid>
	)
}

const LanguageSelect = (props: {
	options?: DatoLanguage[]
	value: number | null
	onChange: (language: number | null) => void
}) => {
	return (
			<Select
				value={props.value}
				fullWidth
				onChange={e => props.onChange(e.target.value as number)}
				renderValue={(selected) => (
					<span style={{paddingLeft: '32px', position: 'relative'}}>
						<LanguageIcon sx={{position: 'absolute', left: 0, top: -3}} />
						{props.options?.find(language => language.id === selected)?.name }
					</span>

				)}
			>
				{props.options?.map(option => (
					<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
				))}
			</Select>
	)
}

export default StagePage