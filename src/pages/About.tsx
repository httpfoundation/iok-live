import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"
import { StructuredText } from "react-datocms"
import { useLiveStaticElements } from "../Store"
import {  Grid } from "@mui/material"
import PresenterCard, { PresenterGrid } from "../components/PresenterCard"


const About = () => {
    const {httpCsapat} = useLiveStaticElements()
	const {httpMemberPlus} = useLiveStaticElements()
	
	const emptySpeaker = {
		id: 0,
		name: "",
		bio: "",
		title: "",
		company: "",
		slug: " ",
		talk: []
	}
	const httpStaff = [
		{	
			...emptySpeaker,
			name: "Virga Kriszta",
			title: "ITMP projektvezető", 
			image: {
				url: "https://www.datocms-assets.com/63196/1647383014-virga_krisztina.png"
			}
		},
		
		{	
			...emptySpeaker,
			name: "Vándor Eszter",
			title: "NetAcad projektvezető", 
			image: {
				url: "https://www.datocms-assets.com/63196/1647383529-vandor_eszter.png"
			}
		},
		
		{	
			...emptySpeaker,
			name: "Antal Renáta",
			title: "irodavezető", 
			image: {
				url: "https://www.datocms-assets.com/63196/1647383811-antal_renata.png"
			}
		},{
			...emptySpeaker,
			name: "Sisák Zoltán",
			title: "elnök", 
			image: {
				url: "https://www.datocms-assets.com/63196/1644788994-sisak_zoltan3.png"
			},
		},

		{	
			...emptySpeaker,
			name: "Reményi Zoltán",
			title: "elnökhelyettes", 
			image: {
				url: "https://www.datocms-assets.com/63196/1647383186-remenyi_zoltan.png"
			}
		},

	]
	return (
 		<PageContainer container>
            <PageTitle>A házigazda HTTP-csapat</PageTitle>
			<Grid container spacing={4} sx={{mb: 4}}>
				<Grid item xs={12} md={8} sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", pb: 1}}>

                    <StructuredText data={httpCsapat}></StructuredText> 
					<PresenterGrid columns={{lg: Math.max(4, httpStaff.length)}}>
						{ httpStaff.map((speaker, index)=> (
						<PresenterCard presenter={speaker} key={index} />
						))}
					</PresenterGrid>
					<StructuredText data={httpMemberPlus}></StructuredText> 
				</Grid>
			</Grid>
		</PageContainer> 
	)
}

export default About