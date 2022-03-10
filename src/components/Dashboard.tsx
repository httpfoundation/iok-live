import Link from "./Link";
import { Grid, Typography, useMediaQuery } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import Bubble from "./Bubble/Bubble"
import { DashboardItemType } from "../types"

interface DashboardItemProps {
	title?: string,
	subtitle?: string,
	corner?: 'bl' | 'br' | 'tl' | 'tr' | 'none',
	size?: 'xs' | 'lg' | 'xl' | 'xxl',
	color?: 'light' | 'primary',
	shadow?: boolean,
	smallText?: boolean,
	darkText?: boolean,
	icon?: boolean,
	children?: React.ReactNode,
	img?: any,
	caption?: string,
	to?: string, 
	xs: number, 
	xl?: number,
	lg?: number,
	imgWidth?: string, 
	empty?: boolean,
	light?: boolean
}




const Dashboard = (props : {items: DashboardItemType[]}) => {
    const {items} = props
    const theme = useTheme();
    const upperThanLg = useMediaQuery(theme.breakpoints.up("lg"));
    const upperThanXl = useMediaQuery(theme.breakpoints.up("xl"));
    const size = upperThanXl ? "xxl" : upperThanLg ? "xl" : "lg";
    const xs = 12
    const xl = 3
    const lg = 3

    return (
        <Grid
            container
            direction={"row"}
            spacing={5}
            sx={{ maxHeight: "calc(100vh - 162px)" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {items.map((item) => {
                const {caption, title, corner, light, img, link} = item
                return  <DashboardItem
                    caption={caption}
                    img={img}
                    to={link}
                    xs={xs}
                    xl={xl}
                    lg={lg}
                    size={size}
                    title={title}
                    light={light}
                    corner={corner}
                />
            })}
        </Grid>
    )
}

export const DashboardItem = (props: DashboardItemProps) => {

    const { img, caption, to, imgWidth, corner, size, xs, xl, lg, empty, light } = props;
	if (empty) return <Grid item xs={xs} xl={xl} lg={lg} display="flex" ></Grid>
    return (
		<Grid item xs={xs} xl={xl} lg={lg} display="flex" alignItems="center" justifyContent="center" textAlign="center">
			
			<Bubble size={size} corner={corner} light={light}>
				<Link to={to}>
					<>
						<DashboardImage src={img} alt={caption} width={imgWidth} />
						<Typography sx={{color:"white"}}>{caption}</Typography>
					</>
				</Link>
			
			</Bubble>
		</Grid>
    )
}

const DashboardImage = styled("img", {shouldForwardProp: (prop) => prop!=='width' })<{width?: Object}>
	( ({theme, width}) => {
		if (width) return width
		else return (
			{
				width: "150px",
				[theme.breakpoints.down("xl")]: {
					width: "100px",
				},
			
			}
		)	
	})

export default Dashboard