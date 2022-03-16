import { PageContainer } from "../components"
import PageTitle from "../components/PageTitle"
import { StructuredText } from "react-datocms"
import { useLiveStaticElements, useStaff } from "../Store"
import {  Grid } from "@mui/material"
import PresenterCard, { PresenterGrid } from "../components/PresenterCard"



const About = () => {
    const {staff: staffText, junior: juniorText, media: mediaText, sessionLead: sessionLeadText} = useLiveStaticElements()
	
	const emptySpeaker = {
		id: 0,
		name: "",
		bio: "",
		title: "",
		company: "",
		slug: " ",
		talk: []
	}	
	const staff = useStaff("staff")?.map(member => 
		({
			...emptySpeaker,
			...member
		}))
	console.log("staff", staff)
	const junior = useStaff("junior")?.map(member => 
		({
			...emptySpeaker,
			...member
		}))
		console.log("junior", junior)
		const media = useStaff("media")?.map(member => 
		({
			...emptySpeaker,
			...member
		}))



	return (
 		<PageContainer container>
            <PageTitle>A házigazda HTTP-csapat</PageTitle>
                    <StructuredText data={staffText}></StructuredText> 
					<PresenterGrid columns={{lg: Math.max(4, staff.length)}}>
						{ staff.map((speaker, index)=> (
						<PresenterCard presenter={speaker} key={index} />
						))}
					</PresenterGrid>
					<StructuredText data={mediaText}></StructuredText> 
					<PresenterGrid columns={{lg: Math.max(4, staff.length)}}>
						{ media.map((speaker, index)=> (
						<PresenterCard presenter={speaker} key={index} />
						))}
					</PresenterGrid>	
					<StructuredText data={juniorText}></StructuredText> 
					<PresenterGrid columns={{lg: Math.max(4, staff.length)}}>
						{ junior.map((speaker, index)=> (
						<PresenterCard presenter={speaker} key={index} />
						))}
					</PresenterGrid>					
		</PageContainer> 
	)
}

export default About