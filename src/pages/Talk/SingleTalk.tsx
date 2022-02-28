import { Link, useParams } from "react-router-dom"
import { useTalk } from "../../Store"

export const SingleTalk = () => {

	const { talkSlug } = useParams()

	const talk = useTalk(talkSlug)

	return (
		<>
			<h1>Előadás: {talk?.title}</h1>

			<h2> Szekció:  <Link to={`/szekcio/${talk?.stage?.slug}`}>{ talk?.stage?.name }</Link> </h2>

			{ talk.speakers.map(speaker => (
				<Link to={`/eloadok/${speaker.slug}`}>
					<img style={{width: '100px'}} src={speaker.image?.url} alt={speaker.name} />
					<h2>{speaker.name}</h2>
				</Link>
			))}
			
		</>
	)
}

export default SingleTalk