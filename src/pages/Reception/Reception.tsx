import { PageContainer } from "../../components"
import PageTitle from "../../components/PageTitle"
import iokCafe from "../../assets/images/iokcafe.png"
import {  Container, } from "@mui/material"

import Dashboard from "../../components/Dashboard"
import { DashboardItemType } from "../../types"

const receptionDashboardItems : DashboardItemType[] = [
    {
        caption: "Köszöntő szép szavak",
        title: "Üdvözlő szép szavak az elnök úrtól",
        img: iokCafe,
        corner: "none",
        light: true,
        link: "#"
    },
    {
        caption: "Programfüzet",
        title: "Minden részlet, amit érdemes tudni a szakmai programról",
        img: iokCafe,
        corner: "br",
        light: false,
        link: "/eloadasok"
    },
    {
        caption: "Előadói tabló",
        title: "Szakképzési, ITMP és NetAcad szekció előadásai a 1. teremben",
        img: iokCafe,
        corner: "br",
        light: false,
        link: "/eloadok"
    },
    {
        caption: "Támogatói szórólap",
        title: "Digitális kultúra szekció előadásai a 2. teremben",
        img: iokCafe,
        corner: "bl",
        light: false,
        link: "/tamogatok"
    },
    {
        caption: "Értékelő űrlap",
        title: "Résztvevők egymás közötti élő beszélgetése öt tematikus asztalnál az IOK kávézójában",
        img: iokCafe,
        corner: "none",
        light: true,
        link: "#"
    },
    {
        caption: "HTTP szervezőcsapat",
        title: "Résztvevők egymás közötti élő beszélgetése öt tematikus asztalnál az IOK kávézójában",
        img: iokCafe,
        corner: "none",
        light: true,
        link: "#"
    },
    {
        caption: "3. terem",
        title: "IT felsőoktatás szekció előadásai a 3. teremben",
        img: iokCafe,
        corner: "tr",
        light: false,
        link: "/szekcio/digitalis-kultura"
    },
    {
        caption: "Visszatérés az Aulába",
        title: "Aula: minden IOK-s dolog kiindulópontja",
        img: iokCafe,
        corner: "tl",
        light: false,
        link: "/"
    },
        
]


const Reception = () => {
	return (
		<PageContainer>
            <Container>
                <PageTitle>Recepció</PageTitle>
                <Dashboard items={receptionDashboardItems} />
            </Container>			
		</PageContainer>
	)
}

/* const DashBoard = () => {
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
} */

export default Reception