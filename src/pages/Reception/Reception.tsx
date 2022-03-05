import { PageContainer } from "../../components"
import PageTitle from "../../components/PageTitle"
import { Grid, Box } from "@mui/material"
import {DashboardItem} from "../../components/Dashboard"
import recepcio from "../../assets/images/recepcio.png"
import valami from "../../assets/images/valami.png"


const Reception = () => {
	return (
		<PageContainer container>
			<PageTitle>Recepció</PageTitle>
			<DashBoard />
		</PageContainer>
	)
}

const DashBoard = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <DashboardItem caption="Köszöntő" img={valami} to="/eloadasok" xs={12} />
					<DashboardItem caption="Programfüzet" img={valami} to="/eloadok" xs={12} />
					<DashboardItem caption="Előadók" img={valami} to="/szekcio/digitalis-kultura" xs={12} />
                </Grid>
                <Grid item xs={12} lg={6} container direction="row" justifyContent="center" alignItems="center">
					<DashboardItem caption="Recepció" img={recepcio} imgWidth="350px" to="#" xs={12} />
				</Grid>
                <Grid item xs={12} lg={3}>
                    <DashboardItem caption="Támogatók" img={valami} to="/tamogatok" xs={12} />
					<DashboardItem caption="Értékelő űrlap" img={valami} to="#" xs={12} />
					<DashboardItem caption="Kapcsolat" img={valami} to="#" xs={12} />
                </Grid>                
            </Grid>
        </Box>
    )
}

export default Reception