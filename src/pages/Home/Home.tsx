//import { useStages } from "../../Store"
import { PageContainer, PageTitle } from "../../components"
import { DashboardItemType } from "../../types"


import recepcio from "../../assets/images/recepcio.png";
import nagyEloado from "../../assets/images/nagyeloado.png";
import szekcio1 from "../../assets/images/szekcio1.png";
import szekcio2 from "../../assets/images/szekcio2.png";
import iokCafe from "../../assets/images/iokcafe.png";

import Dashboard from "../../components/Dashboard"



const homeDashboardItems : DashboardItemType[] = [
    {
        caption: "Recepció",
        title: "Köszöntő, rogramfüzet, előadói tabló, visszajelző kérdőiv, támogatói szórólap, értékelő űrlap, HTTP-csapat brossúra",
        img: recepcio,
        corner: "none",
        light: true,
        link: "/recepcio"
    },
    {
        caption: "Nagyterem",
        title: "Délelőtti plenáris előadások a nagyteremben",
        img: nagyEloado,
        corner: "br",
        light: false,
        link: "/szekcio/plenaris"
    },
    {
        caption: "1. terem",
        title: "Szakképzési, ITMP és NetAcad szekció előadásai a 1. teremben",
        img: szekcio1,
        corner: "br",
        light: false,
        link: "/szekcio/szakkepzes-itmp-netacad"
    },
    {
        caption: "2. terem",
        title: "Digitális kultúra szekció előadásai a 2. teremben",
        img: szekcio2,
        corner: "bl",
        light: false,
        link: "/szekcio/plenaris"
    },
    {
        caption: "IOK Cafe",
        title: "Résztvevők egymás közötti élő beszélgetése öt tematikus asztalnál az IOK kávézójában",
        img: iokCafe,
        corner: "none",
        light: true,
        link: "/iok-cafe"
    },
    {
        caption: "Üzenőfal",
        title: "Résztvevők egymás közötti élő beszélgetése öt tematikus asztalnál az IOK kávézójában",
        img: iokCafe,
        corner: "none",
        light: true,
        link: "uzenofal"
    },
    {
        caption: "3. terem",
        title: "IT felsőoktatás szekció előadásai a 3. teremben",
        img: szekcio1,
        corner: "tr",
        light: false,
        link: "/szekcio/digitalis-kultura"
    },
    {
        caption: "4. terem",
        title: "Digitális kultúra az alsótagozatban előadások a 4. teremben",
        img: szekcio2,
        corner: "tl",
        light: false,
        link: "/szekcio/digitalis-kultura"
    },
        
];

const Home = () => {
    return (
        <PageContainer container>
            <PageTitle>Üdvözlünk az IOK 2022 rendezvényünkön!</PageTitle>
            <Dashboard items={homeDashboardItems} />
        </PageContainer>
    );
};

export default Home;




