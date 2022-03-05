import { useStages } from "../../Store"
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