//import { useStages } from "../../Store"
import { PageContainer, PageTitle } from "../../components"
import { DashboardItemType } from "../../types"


import recepcio from "../../assets/images/recepcio.png"
import nagyEloado from "../../assets/images/nagyeloado.png"
import nagyEloadonyitva from "../../assets/images/nagyeloadonyitva.png"
import szekcio1 from "../../assets/images/szekcio1.png"
import szekcio1nyitva from "../../assets/images/szekcio1nyitva.png"
import szekcio2 from "../../assets/images/szekcio2.png"
import szekcio2nyitva from "../../assets/images/szekcio2nyitva.png"
import szekcio3 from "../../assets/images/szekcio3.png"
import szekcio4 from "../../assets/images/szekcio4.png"
import iokCafe from "../../assets/images/iokcafe.png"
import messageBoard from "../../assets/images/messageboard.png"
import galeria from "../../assets/images/galeria.png"

import Dashboard from "../../components/Dashboard"
import Welcome from "../Welcome";
import { useMemo } from "react"
import { useLiveStaticElements } from "../../Store"




const Home = () => {

    const { galleryUrl } = useLiveStaticElements()

    const homeDashboardItems : DashboardItemType[] = useMemo(() => [

        {
            caption: "Nagyelőadó",
            title: "Délelőtti plenáris előadások a nagyelőadóban",
            img: nagyEloado,
            hoverImg: nagyEloadonyitva,
            corner: "br",
            light: false,
            link: "/szekcio/plenaris",
            mobileOrder: 1
        },
        {
            caption: "1. szekcióterem",
            title: "Szakképzési, ITMP és NetAcad szekció előadásai a 1. szekcióteremben",
            img: szekcio1,
            hoverImg: szekcio1nyitva,
            corner: "none",
            light: false,
            link: "/szekcio/szakkepzes-itmp-netacad",
            mobileOrder: 2
        },
        {
            caption: "2. szekcióterem",
            title: "Digitális kultúra szekció előadásai a 2. szekcióteremben",
            img: szekcio2,
            hoverImg: szekcio2nyitva,
            corner: "none",
            light: false,
            link: "/szekcio/digitalis-kultura",
            mobileOrder: 3
        },
        /* {
            caption: "IOK Cafe",
            title: "Résztvevők egymás közötti élő beszélgetése négy tematikus asztalnál az IOK kávézójában",
            img: iokCafe,
            corner: "bl",
            light: true,
            link: "/iok-cafe",
            mobileOrder: 6
        }, */
        {
            caption: "Galéria",
            title: "Megnézheted az eseményen készült fótókat",
            img: galeria,
            corner: "bl",
            light: true,
            link: galleryUrl,
            external: true,
            mobileOrder: 6
        },
        {
            caption: "Információs pult",
            title: "Köszöntő, programfüzet, előadói tabló, visszajelző kérdőiv, támogatói szórólap, értékelő űrlap, HTTP-csapat brossúra",
            img: recepcio,
            corner: "tr",
            light: true,
            link: "/infopult",
            mobileOrder: 0
        },
        {
            caption: "3. szekcióterem",
            title: "IT felsőoktatás szekció előadásai a 3.szekcióteremben",
            img: szekcio3,
            hoverImg: szekcio1nyitva,
            corner: "none",
            light: false,
            link: "/szekcio/it-felsooktatas",
            mobileOrder: 4
        },
        {
            caption: "4. szekcióterem",
            title: "Digitális kultúra az alsótagozatban előadások a 4. szekcióteremben",
            img: szekcio4,
            hoverImg: szekcio2nyitva,
            corner: "none",
            light: false,
            link: "/szekcio/digitalis-kultura-also-tagozat",
            mobileOrder: 5
        },
        {
            caption: "Üzenőfal",
            title: "Üzenőfal fontos üzenetekkel és felhívásokkal a szervezőktől",
            img: messageBoard,
            corner: "tl",
            light: true,
            link: "/uzenofal",
            mobileOrder: 7
        },
            
    ], [galleryUrl])
    
	
    return (

            <PageContainer container>
                <PageTitle>IOK 2022 Aula</PageTitle>
                <Dashboard items={homeDashboardItems} />
            </PageContainer>
        
    )
}

export default Home




