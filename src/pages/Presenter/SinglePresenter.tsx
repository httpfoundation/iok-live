import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useStore } from "../../Store"
import ScheduleItem from "../../components/ScheduleItem/ScheduleItem"

export const SinglePresenter = () => {

	const { presenterSlug } = useParams()

	const store = useStore()

	const stages = store.stages
	const presenter = useMemo(() => store.presenters.find(p => p.slug === presenterSlug), [presenterSlug, store.presenters])

	const talksByStage = useMemo(() => 
		stages.map(stage => (
			{...stage, schedule: stage.schedule?.filter(talk => talk.speaker.filter(speaker => speaker.id === presenter?.id).length)}
		)).filter(stage => stage.schedule?.length)
	, [stages, presenter?.id])

	return (
		<>
			<h1>{presenter?.name} {presenter?.id}</h1>
			<img style={{width: '200px'}} src={presenter?.image?.url} alt={presenter?.name} />
			<p>{presenter?.title}</p>
			<p>{presenter?.company}</p>
			<h1>Előadások</h1>

			{talksByStage?.map(stage => (
				<div key={stage.id}>
					<h2>Szekció: {stage.name}</h2>
					{ stage.schedule?.map(talk => (
						<Link to={`/eloadasok/${talk.id}`}>
							<ScheduleItem key={talk.id} open talk={talk} />
						</Link>
					))}
				</div>
			))}
		</>
	)
}

export default SinglePresenter