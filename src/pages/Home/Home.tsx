//import { useStages } from "../../Store"
import { PageContainer, PageTitle } from "../../components"
import { useStages } from "../../Store";
import { Grid, Box } from "@mui/material";

import recepcio from "../../assets/images/recepcio.png"
import nagyEloado from "../../assets/images/nagyeloado.png"
import szekcio1 from "../../assets/images/szekcio1.png"
import szekcio2 from "../../assets/images/szekcio2.png"
import iokCafe from "../../assets/images/iokcafe.png"

import {DashboardItem} from "../../components/Dashboard"


const Home = () => {
    const stages = useStages()

    return (
        <PageContainer container>
            <PageTitle>Üdvözlünk az IOK 2022 rendezvényünkön!!</PageTitle>
            <DashBoard />
        </PageContainer>
    );
};

export default Home



const DashBoard = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <DashboardItem caption="Nagyelőadó" img={nagyEloado} to="/szekcio/plenaris" xs={12} />
					<DashboardItem caption="1. szekcióterem" img={szekcio1} to="/szekcio/szakkepzes-itmp-netacad" xs={12} />
					<DashboardItem caption="2. szekcióterem" img={szekcio2} to="/szekcio/digitalis-kultura" xs={12} />
                </Grid>
                <Grid item xs={12} lg={6} container direction="row" justifyContent="center" alignItems="center">
					<DashboardItem caption="Recepció" img={recepcio} imgWidth="350px" to="/recepcio" xs={12} />
				</Grid>
                <Grid item xs={12} lg={3}>
                    <DashboardItem caption="3. szekcióterem" img={szekcio1} to="/szekcio/it-felsooktatas" xs={12} />
					<DashboardItem caption="4. szekcióterem" img={szekcio2} to="/szekcio/digitalis-kultura-also-tagozat" xs={12} />
					<DashboardItem caption="IOK Cafe" img={iokCafe} to="/itmp-klub-cafe" xs={12} />
                </Grid>                
            </Grid>
        </Box>
    )
}



    

