import { AppBar, Grid, Tab, Tabs } from "@mui/material"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { Link, useParams } from "react-router-dom"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useState } from "react"
import { LanguageSelect } from "../../components"
import { useStage } from "../../Store"
import { Box } from "@mui/system"

const StagePage = () => {

	const { stageId } = useParams()
	
	const stage = useStage(stageId)

	const [selectedStreamId, setSelectedStreamId] = useState<number | null>(null)

	useEffect(() => {
		// TODO: Keep language preference
		if (!stage?.streams?.find(stream => stream.id === selectedStreamId)) setSelectedStreamId(stage?.streams?.length ? stage?.streams[0].id : null)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage])

	const selectedStream = stage?.streams?.find(stream => stream.id === selectedStreamId)

	const [selectedTab, setSelectedTab] = useState<number>(0)


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
			<Grid item xs md sx={{}} className="sidebar">
				<Box sx={{display: 'flex', flexDirection: 'column', maxHeight: '100%'}}>
					<AppBar position="static" color="default" sx={{px: 2}}>
						<h1>
							{stage?.name}
						</h1>
						<div>
							<LanguageSelect
								value={selectedStream?.language.id ?? null}
								onChange={(languageId) => setSelectedStreamId(stage?.streams?.find(stream => stream.language.id === languageId)?.id ?? null)}
								options={stage?.streams?.map(stream => stream.language) ?? []}
							/>
						</div>
						<Tabs textColor="secondary" indicatorColor="secondary" value={selectedTab} onChange={(e, v) => setSelectedTab(v)} centered sx={{mt: 2}}>
							<Tab label="Program" />
							<Tab label="Kérdések" />
							<Tab label="Chat" />
						</Tabs>
					</AppBar>
					<Box sx={{px: 1, overflowY: 'scroll', flex: 1, pb: '90px'}}>
						{ selectedTab === 0 && stage?.schedule?.map(talk => <Link to={`/eloadasok/${talk.id}`}><ScheduleItem open key={talk.id} talkId={talk.id} /></Link>) }
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}

export default StagePage