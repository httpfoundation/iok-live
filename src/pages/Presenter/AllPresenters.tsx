import { Link } from "react-router-dom"
import { useStore } from "../../Store"

export const AllPresenters = () => {

	const presenters = useStore().presenters

	return (
		<>
			<h1>Előadók</h1>
			<div>
				{presenters?.map(presenter => (
					<div key={presenter.id}>
						<Link to={`${presenter.slug}`}>
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
