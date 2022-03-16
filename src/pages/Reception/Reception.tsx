import { PageContainer } from "../../components"
import PageTitle from "../../components/PageTitle"
import iokCafe from "../../assets/images/iokcafe.png"
import welcome from "../../assets/images/welcome.png"
import feedback from "../../assets/images/feedback.png"
import http from "../../assets/images/http.png"
import presenters from "../../assets/images/presenters.png"
import sponsors from "../../assets/images/sponsors.png"
import schedule from "../../assets/images/schedule.png"
import handout from "../../assets/images/handout.png"
import menucard from "../../assets/images/menucard.png"
import {  Container, } from "@mui/material"

import Dashboard from "../../components/Dashboard"
import { DashboardItemType } from "../../types"

const receptionDashboardItems : DashboardItemType[] = [
    {
        caption: "Köszöntő",
        title: "Üdvözlő szép szavak az elnök úrtól",
        img: welcome,
        corner: "br",
        light: true,
        link: "/koszonto",
        mobileOrder: 1
    },
    {
        caption: "Programfüzet",
        title: "Minden, amit érdemes tudni a szakmai programról",
        img: schedule,
        corner: "none",
        light: true,
        link: "/eloadasok",
        mobileOrder: 1
    },
    {
        caption: "Előadói tabló",
        title: "Előadóink bemutatkozása",
        img: presenters,
        corner: "none",
        light: false,
        link: "/eloadok",
        mobileOrder: 1
    },
    {
        caption: "Támogatói tabló",
        title: "Támogatóink bemutatkozása",
        img: sponsors,
        corner: "bl",
        light: false,
        link: "/tamogatok",
        mobileOrder: 1
    },
    {
        caption: "Értékelő űrlap",
        title: "Előadások és a konferencia értékelése",
        img: feedback,
        corner: "tr",
        light: true,
        link: "/ertekeles",
        mobileOrder: 1
    },
    {
        caption: "HTTP szervezőcsapat",
        title: "A HTTP-csapat állandó és tiszteletbeli tagjai, akik nélkül nem lenne most konferencia",
        img: http,
        corner: "none",
        light: true,
        link: "/http-csapat",
        mobileOrder: 1
    },
    {
        caption: "Étlap",
        title: "Ami az asztalra kerül...",
        img: menucard,
        corner: "none",
        light: false,
        link: "/etlap",
        mobileOrder: 1
    },
    {
        caption: "IOK VKK útmutató",
        title: "IOK Virtuális Konferenciaközpont használati útmutató",
        img: handout,
        corner: "tl",
        light: false,
        link: "/utmutato",
        mobileOrder: 1
    },
        
]


const Reception = () => {
	return (
		<PageContainer>
            <Container>
                <PageTitle>Információs pult</PageTitle>
                <Dashboard items={receptionDashboardItems} />
            </Container>			
		</PageContainer>
	)
}



export default Reception