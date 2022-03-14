import { AppBar, Grid, Tab, Tabs, Typography, Zoom, CircularProgress, TextField, Alert, FormControlLabel, Checkbox, Button, InputLabel, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import YouTubeVideo from 'react-youtube'
import "./Stage.scss"
import { Link, useParams } from "react-router-dom"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { useEffect, useMemo, useState } from "react"
import { LanguageSelect, PageTitle } from "../../components"
import { useRegistration, useStage, useStore } from "../../Store"
import { Box } from "@mui/system"
import ItmpImg from "../../assets/img/itmp-1.png"
import { styled } from '@mui/material/styles'
import { PageHeaderTitle } from "../../components/PageContainer"
import { DatoTalk } from "../../types"
import { useDatoClient } from "../../useQuery"


const NoStream = () => {
	return <Box sx={{width: '100%', height: '100%', bgcolor: "secondary.main", color: '#fff', py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<Zoom in>
			<Box sx={{textAlign: 'center'}}>
				<img src={ItmpImg} alt="" style={{width: '400px', maxWidth: 'min(calc(50vw * 9 / 16), 50vh)'}}/>
				<Typography sx={{textAlign: 'center', fontSize: {xs: '26px', md:'40px'}, fontWeight: 700, mt: 2, color: '#fff'}}>A közvetítés hamarosan kezdődik!</Typography>
			</Box>
		</Zoom>
	</Box>
}

const Questions = (props: {schedule?: DatoTalk[], stageId?: number}) => {

	const store = useStore()

	const [anonymus, setAnonymus] = useState(false)
	const [targetTalk, setTargetTalk] = useState<number>(0)
	const [targetSpeaker, setTargetSpeaker] = useState<number>(0)
	const [content, setContent] = useState('')
	const [success, setSuccess] = useState(false)

	const talk = useMemo(() => store.talks.find(t => String(t.id) === String(targetTalk)), [targetTalk, store.talks])
	const speakerIds = useMemo(() => talk?.speaker?.map(s => s.id), [talk?.speaker])
	const speakers = useMemo(() => store.presenters.filter(p => speakerIds?.includes(p.id)), [store.presenters, speakerIds])
	
	const client = useDatoClient()
	
	const [registration] = useRegistration()

	const sendQuestion = async () => {
		const data = {
			stage: String(props.stageId),
			talk: String(targetTalk),
			speaker: String(targetSpeaker) || null,
			content,
			registration: anonymus ? null : window.localStorage.registration ?? null
		}
		console.log(data)
		/* client.items.create({
			itemType: 
		}) */
		try {
			await client?.items.create({
				itemType: '1917974',
				...data
			})
			setContent('')
			setTargetSpeaker(0)
			setTargetTalk(0)
			setSuccess(true)
		} catch (e) {
			console.log(e)
			alert("Hiba történt a kérdés elküldése közben. Kérlek próbáld újra később.")
		}

		
	}

	useEffect(() => {
		if (talk && speakers.length === 1) setTargetSpeaker(speakers[0].id)
	}, [talk, speakers])

	if (!props.stageId) return null

	return <>
		<Box sx={{p: 2}}>
			<TextField fullWidth label="Név" color="secondary" sx={{mb: 0}} value={!anonymus ? registration?.name : "≪ Névtelen ≫"} disabled />
			<FormControlLabel control={<Checkbox color="secondary" value={anonymus} onChange={(e, c) => setAnonymus(c)} />} label="Névtelen kérdés" sx={{my: '5px'}} />
			<FormControl fullWidth sx={{my: 1}}>
				<InputLabel color="secondary">Előadás</InputLabel>
				<Select value={targetTalk} label="Előadás" onChange={(e) => setTargetTalk(Number(e.target.value))} color="secondary">
					{ props.schedule?.filter(talk => talk.speaker.length).map(talk => <MenuItem key={talk.id} value={talk.id}>{talk.title}</MenuItem>) }
				</Select>
			</FormControl>
			<FormControl fullWidth sx={{mt: 1}}>
				<InputLabel color="secondary">Címzett előadó</InputLabel>
				<Select value={targetSpeaker} label="Címzett előadó" onChange={(e) => setTargetSpeaker((e.target.value || -1) as number)} color="secondary">
					<MenuItem value={-1}>Nincs</MenuItem>
					{ speakers.map(speaker => <MenuItem key={speaker.id} value={speaker.id}>{speaker.name}</MenuItem>) }
				</Select>
			</FormControl>
			<TextField fullWidth multiline minRows={6} maxRows={10} label="Kérdés" color="secondary" sx={{mt: 2}} value={content} onChange={e => setContent(e.target.value)} />

			<Button variant="contained" color="secondary" sx={{mt: 2}} onClick={sendQuestion}>Küldés</Button>
			
		</Box>
		<Dialog open={success}>
			<DialogTitle>Kérdés sikeresen elküldve</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Köszönjük a kérdésedet.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setSuccess(false)} color="secondary" variant="contained">
					Bezárás
				</Button>
			</DialogActions>
		</Dialog>
	</>
}

const embedDomain = window.localStorage.dev === "true" ? "localhost" : window.origin.replace("https://", "")

const VideoContainer = styled('div')(({theme}) => `

	height: calc(100vw * 9 / 16);
	${theme.breakpoints.up("lg")} {
		height: 100%;
	}
	${theme.breakpoints.down("lg")} {
		max-height: calc(100vw * 9 / 16);
	}
	overflow-y: hidden;
	width: 100%;

`)

const StagePage = () => {

	const { stageId: stageSlug } = useParams()
	
	const stage = useStage(stageSlug)

	const [selectedStreamId, setSelectedStreamId] = useState<number | null>(null)

	useEffect(() => {
		// TODO: Keep language preference
		if (!stage?.streams?.find(stream => stream.id === selectedStreamId)) setSelectedStreamId(stage?.streams?.length ? stage?.streams[0].id : null)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage])

	
	const selectedStream = stage?.streams?.find(stream => stream.id === selectedStreamId)
	
	const [selectedTab, setSelectedTab] = useState<number>(0)
	
	useEffect(() => setSelectedTab(0), [stageSlug])

	return (
		<>
			<Box sx={{height: '100%', 'display': 'flex', flexDirection: 'column'}}>
				<Box sx={{bgcolor: "#ace8ea"}}>
					<PageTitle>{stage?.name}</PageTitle>
				</Box>
				<Grid container spacing={0} id="stage" sx={{height: '100%', overflowY: 'hidden', maxHeight: '100%'}}>
					<Grid item xs={12} lg={9} sx={{position: 'relative', height: {md: '100%'}}}>
						{/* <Box sx={{width: '100%', height: '100%', backgroundColor: '#000', zIndex: -1, position: 'absolute'}}>
							<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100}}>
								<CircularProgress size={60} sx={{zIndex: 100, color: '#fff'}} />
							</Box>
						</Box> */}
						
							{ selectedStream?.youtubeVideoId && <VideoContainer><YouTubeVideo
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
										playlist: selectedStream.youtubeVideoId
									}
								}}
							/></VideoContainer> }
						
						{ stage?.name && !selectedStreamId && <NoStream /> }
					</Grid>
					<Grid item xs={12} lg={3} sx={{height: {xs: 'calc(100% - (100vw * 9 / 16))', md: '100%'}}}>
						<Box sx={{display: 'flex', flexDirection: 'column', maxHeight: 'calc(100%)', height: '100%'}}>
							<AppBar component="div" position="static" color="default" sx={{px: 2, bgcolor: "#ace8ea", pt: 4, borderTop: '1px solid #939393'}} elevation={1}>
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
							<Box sx={{flex: 1, overflow: "auto", px: 1}}>
								{ selectedTab === 0 && <>{ stage?.schedule?.map(talk => <Link to={`/eloadasok/${talk.id}`}><ScheduleItem open key={talk.id} talkId={talk.id} /></Link>) }</> }							
								{ selectedTab === 1 && <Questions schedule={stage?.schedule} stageId={stage?.id} /> }
								{ selectedTab === 2 && selectedStream && 
								<Box sx={{position: "relative", flex: 1, height: '100%', overflowY: 'hidden', minHeight: '500px'}}>
									<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress sx={{zIndex: 100}} color="secondary" /></Box>
									<iframe key={selectedStream?.youtubeVideoId} title="chat" style={{position: 'relative', width: '100%', height: '100%'}} allowFullScreen frameBorder="0" src={`https://www.youtube.com/live_chat?v=${selectedStream?.youtubeVideoId}&embed_domain=${embedDomain}&dark_theme=0`}></iframe>
								</Box>}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default StagePage