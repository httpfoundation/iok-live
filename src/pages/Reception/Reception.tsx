import { PageContainer } from "../../components"
import PageTitle from "../../components/PageTitle"
import { Grid, Box, Container } from "@mui/material"
import {DashboardItem} from "../../components/Dashboard"
import iokCafe from "../../assets/images/iokcafe.png"


const Reception = () => {
	return (
		<PageContainer>
            <Container>
                <PageTitle>Recepció</PageTitle>
                <DashBoard />
            </Container>			
		</PageContainer>
	)
}

const DashBoard = () => {
    const size="xl"
    const xs = 12
    const xl = 3
    return (
        <Grid container spacing={2}>
            <DashboardItem caption="Köszöntő" img={iokCafe} to="#" xs={xs} xl={xl} size="xl" title="Köszöntő"/>
            <DashboardItem caption="Programfüzet" img={iokCafe} to="/eloadasok" xs={xs} xl={xl} size={size} corner="bl"/>
            <DashboardItem caption="Előadók" img={iokCafe} to="/eloadok" xs={xs} xl={xl} size={size} corner="br" />
            <DashboardItem caption="Támogatók" img={iokCafe} to="/tamogatok" xs={xs} xl={xl} size={size} corner="bl"/>
            <DashboardItem caption="Értékelő úrlap" img={iokCafe} to="#" xs={xs} xl={xl} size={size} corner="tr"/>
            <DashboardItem xs={xs} xl={xl} empty/>
            <DashboardItem caption="Kapcsolat" img={iokCafe} to="#" xs={xs} xl={xl} size={size} corner="tr"/>
            <DashboardItem caption="Recepció" img={iokCafe} to="/" xs={xs} xl={xl} size={size} corner="tl"/>
        </Grid>
    )
}

export default Reception