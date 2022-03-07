import { PageContainer } from "../../components"
import PageTitle from "../../components/PageTitle"
import {DashboardItem} from "../../components/Dashboard"
import iokCafe from "../../assets/images/iokcafe.png"
import { Grid, Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'


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
    const theme = useTheme()
	const upperThanLg = useMediaQuery(theme.breakpoints.up('lg'))    
    const upperThanXl = useMediaQuery(theme.breakpoints.up('xl')) 
    const size=(upperThanXl) ? "xxl" : (upperThanLg) ?  "xl" : "lg"
    const xs = 12
    const xl = 3
    const lg = 3
    return (
        <Grid container direction={"row"} spacing={5} sx={{maxHeight: "calc(100vh - 162px)"}} display="flex" alignItems="center" justifyContent="center">
            <DashboardItem caption="Köszöntő" img={iokCafe} to="#" xs={xs} xl={xl} size={size} title="Köszöntő"/>
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