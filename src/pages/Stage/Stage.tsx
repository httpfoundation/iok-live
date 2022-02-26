import Grid from "@mui/material/Grid"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { useParams } from "react-router-dom"
import useQuery from "../../useQuery"
import { DatoStage } from "../../types"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"

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

	console.log(stage)

	return (
		<Grid container spacing={0} id="stage">
			<Grid item xs={9} className="embed-video-row">
				{/* <YouTubeVideo
					videoId="oGbMiKcho3A"
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
				/> */}
			</Grid>
			<Grid item xs sx={{px: 3}} className="sidebar">
				<h1>{stage.name}</h1>

				{stage?.streams?.map((stream) => (<div key={stream.id}>{stream.language?.name} {stream.youtubeVideoId}</div>))}

				{ stage?.schedule?.map(talk => <ScheduleItem open key={talk.id} talk={talk} />) }
			</Grid>
		</Grid>
	)
}

export default StagePage