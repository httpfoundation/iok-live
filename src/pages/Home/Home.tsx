//import { useStages } from "../../Store"
import { PageContainer, PageTitle } from "../../components"
import { DashboardItemType } from "../../types"


import recepcio from "../../assets/images/recepcio.png"
import nagyEloado from "../../assets/images/nagyeloado.png"
import szekcio1 from "../../assets/images/szekcio1.png"
import szekcio2 from "../../assets/images/szekcio2.png"
import szekcio3 from "../../assets/images/szekcio3.png"
import szekcio4 from "../../assets/images/szekcio4.png"
import iokCafe from "../../assets/images/iokcafe.png"
import messageBoard from "../../assets/images/messageboard.png"

import Dashboard from "../../components/Dashboard"
import Welcome from "../Welcome";



const homeDashboardItems : DashboardItemType[] = [

    {
        caption: "Nagyelőadó",
        title: "Délelőtti plenáris előadások a nagyelőadóban",
        img: nagyEloado,
        corner: "br",
        light: false,
        link: "/szekcio/plenaris"
    },
    {
        caption: "1. szekcióterem",
        title: "Szakképzési, ITMP és NetAcad szekció előadásai a 1. szekcióteremben",
        img: szekcio1,
        corner: "none",
        light: false,
        link: "/szekcio/szakkepzes-itmp-netacad"
    },
    {
        caption: "2. szekcióterem",
        title: "Digitális kultúra szekció előadásai a 2. szekcióteremben",
        img: szekcio2,
        corner: "none",
        light: false,
        link: "/szekcio/digitalis-kultura"
    },

    {
        caption: "IOK Cafe",
        title: "Résztvevők egymás közötti élő beszélgetése négy tematikus asztalnál az IOK kávézójában",
        img: iokCafe,
        corner: "bl",
        light: true,
        link: "/iok-cafe"
    },
    {
        caption: "Információs pult",
        title: "Köszöntő, rogramfüzet, előadói tabló, visszajelző kérdőiv, támogatói szórólap, értékelő űrlap, HTTP-csapat brossúra",
        img: recepcio,
        corner: "tr",
        light: true,
        link: "/recepcio"
    },
    {
        caption: "3. szekcióterem",
        title: "IT felsőoktatás szekció előadásai a 3.szekcióteremben",
        img: szekcio3,
        corner: "none",
        light: false,
        link: "/szekcio/it-felsooktatas"
    },
    {
        caption: "4. szekcióterem",
        title: "Digitális kultúra az alsótagozatban előadások a 4. szekcióteremben",
        img: szekcio4,
        corner: "none",
        light: false,
        link: "/szekcio/digitalis-kultura-also-tagozat"
    },
    {
        caption: "Üzenőfal",
        title: "Üzenőfal fontos üzenetekkel és felhívásokkal a szervezőktől",
        img: messageBoard,
        corner: "tl",
        light: true,
        link: "/uzenofal"
    },
        
];

const Home = () => {
    
	
    return (

            <PageContainer container>
                <PageTitle>IOK 2022 Aula</PageTitle>
                <Dashboard items={homeDashboardItems} />
            </PageContainer>
        
    )
}

export default Home




