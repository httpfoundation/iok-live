import { Link, useNavigate } from "react-router-dom"
import { useStages } from "../../Store"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { PageContainer, PageTitle } from "../../components"
import { Container } from "@mui/material"
import { useState } from "react"

export const AllTalks = () => {

	const stages = useStages()

	const [openScheduleItem, setOpenScheduleItem] = useState<number | null>(null)
	const navigate = useNavigate()

	return (
		<PageContainer>
			<PageTitle>Előadások</PageTitle>
			<Container>
				{stages?.map(stage => (
					<div key={stage.id}>
						<h2>Szekció: <Link to={`/szekcio/${stage.slug}`}>{stage.name}</Link></h2>
						{ stage.schedule?.map(talk => <ScheduleItem onPlay={streamId => navigate('/szekcio/' + stage.slug, {state: {streamId, openScheduleItem: talk.id}})} key={talk.id} onClick={() => setOpenScheduleItem(openScheduleItem === talk.id ? null : talk.id)} open={openScheduleItem === talk.id} talkId={talk.id} />)}
					</div>
				))}
			</Container>
		</PageContainer>
	)
}
