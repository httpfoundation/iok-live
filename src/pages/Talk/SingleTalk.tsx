import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useStore } from "../../Store"

export const SingleTalk = () => {

	const { talkSlug } = useParams()

	const store = useStore()

	const talk = useMemo(() => store.talks.find(t => String(t.id) === talkSlug), [talkSlug, store.talks])
	const speakerIds = useMemo(() => talk?.speaker?.map(s => s.id), [talk?.speaker])
	const speakers = useMemo(() => store.presenters.filter(p => speakerIds?.includes(p.id)), [store.presenters, speakerIds])	

	return (
		<>
			<h1>Előadás: {talk?.title}</h1>

			<h2> Szekció:  <Link to={`/szekcio/${talk?.stage?.slug}`}>{ talk?.stage?.name }</Link> </h2>

			{ speakers.map(speaker => (
				<Link to={`/eloadok/${speaker.slug}`}>
					<img style={{width: '100px'}} src={speaker.image?.url} alt={speaker.name} />
					<h2>{speaker.name}</h2>
				</Link>
			))}
			
		</>
	)
}

export default SingleTalk