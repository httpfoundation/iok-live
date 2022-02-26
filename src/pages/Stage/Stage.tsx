import Grid from "@mui/material/Grid"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { useParams } from "react-router-dom"
import useQuery from "../../useQuery"
import { DatoStage, DatoStream } from "../../types"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useState } from "react"
import { LanguageSelect } from "../../components"

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

export default StagePage