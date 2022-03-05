import { Box } from "@mui/material"
import  Link  from "../../components/Link"
import { PageContainer, PageTitle } from "../../components"
import { usePresenters } from "../../Store"
import "./Presenters.scss"

const PresenterCard = (props) => {
    return (
		<div className="presenter-card" style={props.style ? props.style : {}}>
			<div className="presenter-wrapper">
				<div className="presenter-img" style={{ backgroundImage: "url('" + props.imageUrl + "')"}}></div>
				<div className="presenter-name-mobile">
					<div className="name">{props.name}</div>
					<div className="title">{props.title}, {props.company}</div>
				</div>
			</div>
		</div>
    )
}

export const AllPresenters = () => {

	const presenters = usePresenters()

	return (
		<PageContainer>
			<PageTitle>Előadóink</PageTitle>
		
			<div className="presenters-grid small">
				{presenters?.map((presenter, index) => (
					<Link to={`/eloadok/${presenter.slug}`}>
						<PresenterCard
								key={presenter.slug}
								name={presenter.name}
								title={presenter.title}
								company={presenter.company}
								imageUrl={presenter.image?.url}
							/>
					</Link>
				))}
			</div>
		</PageContainer>
	)
}
