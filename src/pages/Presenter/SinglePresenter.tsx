import { Link, useParams } from "react-router-dom"
import { usePresenterWithTalksByStage } from "../../Store"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"

export const SinglePresenter = () => {

	const { presenterSlug } = useParams()

	const presenter = usePresenterWithTalksByStage(presenterSlug ?? null)

	return (
		<>
			<h1>{presenter?.name} {presenter?.id}</h1>
			<img style={{width: '200px'}} src={presenter?.image?.url} alt={presenter?.name} />
			<p>{presenter?.title}</p>
			<p>{presenter?.company}</p>
			<h1>Előadások</h1>

			{presenter.talksByStage?.map(stage => (
				<div key={stage.id}>
					<h2>Szekció: {stage.name}</h2>
					{ stage.schedule?.map(talk => (
						<Link to={`/eloadasok/${talk.id}`}>
							<ScheduleItem key={talk.id} open talkId={talk.id} />
						</Link>
					))}
				</div>
			))}
		</>
	)
}

export default SinglePresenter