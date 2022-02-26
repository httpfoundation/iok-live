import { Link } from "react-router-dom"
import { DatoSpeaker } from "../../types"
import useQuery from "../../useQuery"

export const AllPresenters = () => {

	const [presenters] = useQuery<DatoSpeaker[]>(`
		{
			allSpeakers {
				id
				name
				title
				company
				image {
					url
				}
			}
		}
	`, [])

	return (
		<>
			<h1>Előadók</h1>
			<div>
				{presenters?.map(presenter => (
					<div key={presenter.id}>
						<Link to={`/presenter/${presenter.id}`}>
							<img style={{ height: '50px' }} src={presenter.image?.url} alt={presenter.name} />
							<span>{presenter.name}</span>
							<span>{presenter.title}, {presenter.company}</span>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
