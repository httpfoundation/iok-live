import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"
import { StructuredText } from "react-datocms"
import { useLiveStaticElements } from "../Store"
import {  Grid } from "@mui/material"


const About = () => {
    const {httpCsapat} = useLiveStaticElements()
	return (
 		<PageContainer container>
            <PageTitle>A házigazda HTTP-csapat</PageTitle>
			<Grid container spacing={4} sx={{mb: 4}}>
				<Grid item xs={12} md={8} sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", pb: 1}}>

                    <StructuredText data={httpCsapat}></StructuredText> 
				</Grid>
			</Grid>
		</PageContainer> 
	)
}

export default About