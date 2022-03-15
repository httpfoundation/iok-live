import { PageContainer } from "../../components"
import Bubble from "../../components/Bubble/Bubble"
import PageTitle from "../../components/PageTitle"
import { Container } from "@mui/material"

const Sponsors = () => {
	return (
		<PageContainer>
				<Container>
					<PageTitle>Támogatóink</PageTitle>
					<Bubble caption="T-Systems" size="xl" corner="tr"/>
				</Container>
		</PageContainer>
	)
}

export default Sponsors