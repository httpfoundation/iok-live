import { Link } from "react-router-dom"
import { useStages } from "../../Store"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"

export const AllTalks = () => {

	const stages = useStages()

	return (
		<>
			<h1>Előadások</h1>
			<div>
				{stages?.map(stage => (
					<div key={stage.id}>
						<h2>Szekció: <Link to={`/szekcio/${stage.slug}`}>{stage.name}</Link></h2>
						{ stage.schedule?.map(talk => (
							<Link to={`${talk.id}`}>
								<ScheduleItem key={talk.id} open talkId={talk.id} />
							</Link>
						))}
					</div>
				))}
			</div>
		</>
	)
}