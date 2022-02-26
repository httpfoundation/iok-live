import { useParams } from "react-router-dom"
import { DatoSpeaker } from "../../types"
import useQuery from "../../useQuery"

export const SinglePresenter = () => {

	const { presenterSlug } = useParams()


	const [presenter] = useQuery<DatoSpeaker>(`
		{
			speaker(filter: {id: {eq: "${presenterSlug}"}}) {
				id
				name
				title
				company
				image {
					url
				}
			}
		}
	`, {} as DatoSpeaker)

	return (
		<>
			<h1>{presenter.name}</h1>
			<img src={presenter.image?.url} alt={presenter.name} />
			<p>{presenter.title}</p>
			<p>{presenter.company}</p>
			
			<div />
		</>
	)
}

export default SinglePresenter