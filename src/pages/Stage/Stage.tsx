import Grid from "@mui/material/Grid"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { Link, useParams } from "react-router-dom"
import {  DatoStream } from "../../types"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useState } from "react"
import { LanguageSelect } from "../../components"
import { useStage } from "../../Store"

const StagePage = () => {

	const { stageId } = useParams()
	
	const stage = useStage(stageId)

	const [selectedStreamId, setSelectedStreamId] = useState<number | null>(null)

	useEffect(() => {
		// TODO: Keep language preference
		if (!stage?.streams?.find(stream => stream.id === selectedStreamId)) setSelectedStreamId(stage?.streams?.length ? stage?.streams[0].id : null)
	}, [stage])

	const selectedStream = stage?.streams?.find(stream => stream.id === selectedStreamId)


	return (
		<Grid container spacing={0} id="stage">
			<Grid item xs={12} md={9} className="embed-video-row">
				{ selectedStream?.youtubeVideoId ? <YouTubeVideo
					videoId={selectedStream.youtubeVideoId}
					containerClassName="embed-video"
					className="embed-video-inner"
					opts={{
						playerVars: {
							autoplay: 1,
							hl: 'hu',
							//modestbranding: 1,
							rel: 0,
							color: 'white',
							controls: 1,
							showinfo: 0,
							loop: 1,
							origin: window.location.origin,

						}
					}}
				/> : <h1>No stream</h1>}
			</Grid>
			<Grid item xs md sx={{px: 3}} className="sidebar">
				<h1>
					{stage?.name}
				</h1>
				<LanguageSelect
					value={selectedStream?.language.id ?? null}
					onChange={(languageId) => setSelectedStreamId(stage?.streams?.find(stream => stream.language.id === languageId)?.id ?? null)}
					options={stage?.streams?.map(stream => stream.language) ?? []}
				/>
				{ stage?.schedule?.map(talk => <Link to={`/eloadasok/${talk.id}`}><ScheduleItem open key={talk.id} talkId={talk.id} /></Link>) }
			</Grid>
		</Grid>
	)
}

export default StagePage