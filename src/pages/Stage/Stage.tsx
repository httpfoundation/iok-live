import Grid from "@mui/material/Grid"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { Link, useParams } from "react-router-dom"
import {  DatoStream } from "../../types"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useMemo, useState } from "react"
import { LanguageSelect } from "../../components"
import { useStore } from "../../Store"

const StagePage = () => {

	const { stageId } = useParams()
	
	const store = useStore()
	
	const stage = useMemo(() => store.stages.find(s => s.slug === stageId), [stageId, store.stages])

	const [selectedStream, setSelectedStream] = useState<DatoStream| null>(null)

	useEffect(() => {
		// TODO: Keep language preference
		if (!stage?.streams?.find(stream => stream.id === selectedStream?.id)) setSelectedStream(stage?.streams?.length ? stage?.streams[0] : null)
	}, [selectedStream?.id, stage])


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
							color: 'red',
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
					onChange={(languageId) => setSelectedStream(stage?.streams?.find(stream => stream.language.id === languageId) ?? null)}
					options={stage?.streams?.map(stream => stream.language) ?? []}
				/>
				{ stage?.schedule?.map(talk => <Link to={`/eloadasok/${talk.id}`}><ScheduleItem open key={talk.id} talk={talk} /></Link>) }
			</Grid>
		</Grid>
	)
}

export default StagePage