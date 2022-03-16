import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"
import { StructuredText } from "react-datocms"
import { useLiveStaticElements, useStaff } from "../Store"
import { Box } from "@mui/material"


const ManuCard = () => {
    const {menu: menuCard} = useLiveStaticElements()


	return (
 		<PageContainer container>
			 <Box sx={{textAlign: "center"}}>
				<PageTitle>Étlap</PageTitle>
				<StructuredText data={menuCard}></StructuredText> 
			 </Box>
		</PageContainer> 
	)
}

export default ManuCard