import { Link } from "react-router-dom"
import { useStages } from "../../Store"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"
import { PageContainer, PageTitle } from "../../components"
import { Container } from "@mui/material"

export const AllTalks = () => {

	const stages = useStages()

	return (
		<PageContainer>
			<PageTitle>Előadások</PageTitle>
			<Container>
				{stages?.map(stage => (
					<div key={stage.id}>
						<h2>Szekció: <Link to={`/szekcio/${stage.slug}`}>{stage.name}</Link></h2>
						{ stage.schedule?.map((talk, index) => (
							<Link to={`${talk.id}`} key={index}>
								<ScheduleItem open talkId={talk.id} />
							</Link>
						))}
					</div>
				))}
			</Container>
		</PageContainer>
	)
}
