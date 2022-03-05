import { AppBar, Grid, Tab, Tabs, Typography, Zoom, CircularProgress } from "@mui/material"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { Link, useParams } from "react-router-dom"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { Suspense, useEffect, useState } from "react"
import { LanguageSelect } from "../../components"
import { useStage } from "../../Store"
import { Box } from "@mui/system"
import ItmpImg from "../../assets/img/itmp-1.png"

const NoStream = () => {
	return <Box sx={{width: '100%', height: '100%', backgroundColor: '#14475C', color: '#fff', position: 'relative'}}>
			<Box sx={{width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
				<Zoom in>
					<Box>
						<img src={ItmpImg} alt="" style={{width: '400px'}}/>
						<Typography sx={{textAlign: 'center', fontSize: '40px', fontWeight: 700, mt: 2}}>A közvetítés hamarosan kezdődik!</Typography>
					</Box>
				</Zoom>
			</Box>
	</Box>
}

const embedDomain = window.localStorage.dev === "true" ? "localhost" : window.origin.replace("https://", "")

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
	
	useEffect(() => setSelectedTab(0), [stageId])

	return (
		<Grid container spacing={0} id="stage">
			<Grid item xs={12} md={9} className="embed-video-row" sx={{position: 'relative'}}>
				<Box sx={{width: '100%', height: '100%', backgroundColor: '#000', zIndex: -1, position: 'absolute'}}>
					<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100}}>
						<CircularProgress size={60} sx={{zIndex: 100, color: '#fff'}} />
					</Box>
				</Box>
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
							color: 'white',
							controls: 1,
							showinfo: 0,
							loop: 1,
							origin: window.location.origin,

						}
					}}
				/> }
				{ stage?.name && !selectedStreamId && <NoStream /> }
			</Grid>
			<Grid item xs md sx={{}} className="sidebar">
				<Box sx={{display: 'flex', flexDirection: 'column', maxHeight: 'calc(100%)', height: '100%'}}>
					<AppBar component="div" position="static" color="default" sx={{px: 2}} elevation={1}>
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
						<Tabs textColor="secondary" indicatorColor="secondary" value={selectedTab} onChange={(e, v) => setSelectedTab(v)} centered sx={{mt: stage?.streams?.length ? 2 : 0}}>
							<Tab label="Program" />
							<Tab label="Kérdések" />
							<Tab label="Chat" disabled={!selectedStream} />
						</Tabs>
					</AppBar>
						{ selectedTab === 0 && <Box sx={{flex: 1, overflow: "auto", px: 1}}>
							{ stage?.schedule?.map(talk => <Link to={`/eloadasok/${talk.id}`}><ScheduleItem open key={talk.id} talkId={talk.id} /></Link>) }
						</Box>}
						{ selectedTab === 2 && selectedStream && 
						<Box sx={{position: "relative", flex: 1, height: '100%', overflowY: 'hidden'}}>
							<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress sx={{zIndex: 100}} color="secondary" /></Box>
							<iframe key={selectedStream?.youtubeVideoId} title="chat" style={{position: 'relative', width: '100%', height: '100%'}} allowFullScreen frameBorder="0" src={`https://www.youtube.com/live_chat?v=${selectedStream?.youtubeVideoId}&embed_domain=${embedDomain}&dark_theme=0`}></iframe>
						</Box>}
				</Box>
			</Grid>
		</Grid>
	)
}

export default StagePage