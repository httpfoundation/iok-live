import { PageContainer, PageSubtitle, Paragraph } from "../components"
import Bubble from "../components/Bubble/Bubble"
import PageTitle from "../components/PageTitle"
import { Box, Button, Container, Grid, Typography, TypographyProps } from "@mui/material"
import { styled } from "@mui/system"
import { StructuredText } from "react-datocms"
import { useLiveStaticElements, useRegistration } from "../Store"
import {Home as HomeIcon, PermDeviceInformation as InformationIcon } from '@mui/icons-material'
import { Link } from "react-router-dom"

const ChairmanImage = styled('img')`
	width: 100%;
	height: auto;
	border-radius: 20px;
`
const chairman = 
    {
            name: "Sisák Zoltán",
            title: "elnök",
            image: {
                url: "https://www.datocms-assets.com/63196/1644788994-sisak_zoltan3.png"
            },
            id: "107304877",
            company: "HTTP Alapítvány",
    }

const Title = styled(Typography)<TypographyProps>(({theme}) => `
	text-align: "left";
	font-weight: 500;
	margin: 0 0 0 0;
`)

const Name = styled(Typography)<TypographyProps>(({theme}) => `
	text-align: "left";
	font-weight: 700;
    font-size: 1.6rem;
	margin: 0 0 0 0;
`)

const Welcome = () => {
    const {welcome} = useLiveStaticElements()
	const [registration, loading] = useRegistration()
    window.localStorage.setItem("welcome", "true") 
	return (
 		<PageContainer container>
            <PageTitle>Köszöntő</PageTitle>
			<Grid container spacing={4} sx={{mb: 4}}>
				<Grid item xs={12} md={4}>
					<ChairmanImage src={chairman?.image?.url} alt={chairman?.name} />
					<Name >{chairman?.name}</Name>
					<Title>{chairman?.title}, {chairman?.company}</Title>
				</Grid>
				<Grid item xs={12} md={8} sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end", pb: 1}}>
                    <Name >Kedves {registration?.name}!</Name>
                    <StructuredText data={welcome}></StructuredText> 
					<Box>
						<Link to="/utmutato">
							<Button variant="contained" color="secondary" startIcon={<InformationIcon /> } sx={{mr: 1, pt:1, pb:1, mt: {xs: 1, md: 0}}}>Tovább az IOK VKK útmutatóhoz</Button>
						</Link>
						<Link to="/">
							<Button variant="contained" color="secondary" startIcon={<HomeIcon />} sx={{pt:1, pb:1, mt: {xs: 1, md: 0}}}>Tovább az IOK Aulába</Button>
						</Link>
					</Box>

						

					
				</Grid>
				<Grid item xs={12} md={12} sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end", pb: 1}}>

				</Grid>                
			</Grid>
		</PageContainer> 
	)
}

export default Welcome