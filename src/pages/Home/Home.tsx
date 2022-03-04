import { Link as ReactRouterLink } from "react-router-dom"
import { useStages } from "../../Store"
import Typography from '@mui/material/Typography'
import Link from '../../components/Link'
import { PageContainer, PageTitle } from "../../components"

const Home = () => {

	const stages = useStages()

	return (
		<PageContainer>
			<PageTitle>Üdvözlünk az IOK 2022 rendezvényünkön!</PageTitle>
		</PageContainer>
	)
}

export default Home