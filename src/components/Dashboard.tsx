import Link from "./Link";
import { Grid, Paper, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Bubble from "./Bubble/Bubble"




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

interface DashboardItemProps {
	title?: string,
	subtitle?: string,
	corner?: ('bl' | 'br' | 'tl' | 'tr'),
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
	empty?: boolean
}

export const DashboardItem = (props: DashboardItemProps) => {

    const { img, caption, to, imgWidth, corner, size, xs, xl, lg, empty } = props;
	if (empty) return <Grid item xs={xs} xl={xl} lg={lg} display="flex" ></Grid>
    return (
		<Grid item xs={xs} xl={xl} lg={lg} display="flex" alignItems="center" justifyContent="center" textAlign="center">
			
			<Bubble size={size} corner={corner}>
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
