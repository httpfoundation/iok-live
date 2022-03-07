//import { useStages } from "../../Store"
import { PageContainer, PageTitle } from "../../components"
import { Grid, Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'

import recepcio from "../../assets/images/recepcio.png"
import nagyEloado from "../../assets/images/nagyeloado.png"
import szekcio1 from "../../assets/images/szekcio1.png"
import szekcio2 from "../../assets/images/szekcio2.png"
import iokCafe from "../../assets/images/iokcafe.png"

import {DashboardItem} from "../../components/Dashboard"



const Home = () => {

    return (
        <PageContainer container>
            <PageTitle>Üdvözlünk az IOK 2022 rendezvényünkön!</PageTitle>
            <DashBoard />
        </PageContainer>
    );
};

export default Home


const DashBoard = () => {
	const theme = useTheme()
	const upperThanLg = useMediaQuery(theme.breakpoints.up('lg'))    
    const upperThanXl = useMediaQuery(theme.breakpoints.up('xl')) 
    const size=(upperThanXl) ? "xxl" : (upperThanLg) ?  "xl" : "lg"
    const xs = 12
    const xl = 3
    const lg = 3


    
    return (
                 <Grid container direction={"row"} spacing={5} sx={{maxHeight: "calc(100vh - 162px)"}} display="flex" alignItems="center" justifyContent="center">
                    <DashboardItem caption="Recepció" img={recepcio} to="/recepcio" xs={xs} xl={xl} lg={lg} size={size} title="Recepció"/>
                    <DashboardItem caption="Nagyelőadó" img={nagyEloado} to="/szekcio/plenaris" xs={xs} xl={xl} lg={lg} size={size} corner="bl"/>
                    <DashboardItem caption="1. szekcióterem" img={szekcio1} to="/szekcio/szakkepzes-itmp-netacad" xs={xs} xl={xl} lg={lg} size={size} corner="br" />
                    <DashboardItem caption="2. szekcióterem" img={szekcio2} to="/szekcio/digitalis-kultura" xs={xs} xl={xl} lg={lg} size={size} corner="bl"/>
                    <DashboardItem caption="IOK Cafe" img={iokCafe} to="/itmp-klub-cafe" xs={xs} xl={xl} lg={lg} size={size} corner="tr"/>
                    <DashboardItem xs={xs} xl={xl} lg={lg} empty/>
                    <DashboardItem caption="3. szekcióterem" img={szekcio1} to="/szekcio/it-felsooktatas" xs={xs} xl={xl} lg={lg} size={size} corner="tr"/>
                    <DashboardItem caption="4. szekcióterem" img={szekcio2} to="/szekcio/digitalis-kultura-also-tagozat" xs={xs} xl={xl} lg={lg} size={size} corner="tl"/>
                </Grid>         
        
    )
}   



    

