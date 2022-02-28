import { Box } from "@mui/material"
import  Link  from "../../components/Link"
import { PageTitle } from "../../components"
import { usePresenters } from "../../Store"

export const AllPresenters = () => {

	const presenters = usePresenters()

	return (
		<>
			<PageTitle>Előadóink</PageTitle>
		
			<div>
				{presenters?.map(presenter => (
					<div key={presenter.id}>
						<Link to={`${presenter.slug}`}>
							<Box p={2}
								sx={{
									width: 300,
									'&:hover': {
										backgroundColor: 'secondary.main',
										opacity: [0.9, 0.8, 0.7],
									},
								}}
							>
								<img style={{ height: '270px', width: "270px" }} src={presenter.image?.url} alt={presenter.name} />
								<div>
									<span>{presenter.name}</span>
									<span>{presenter.title}, {presenter.company}</span>
								</div>
							</Box>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
