import Link from "./Link";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Bubble from "./Bubble/Bubble";


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
	imgWidth?: string, 
	empty?: boolean
}

export const DashboardItem = (props: DashboardItemProps) => {
    const { img, caption, to, imgWidth, corner, size, xs, xl, empty } = props;
	if (empty) return <Grid item xs={xs} xl={xl} display="flex" ></Grid>
    return (
		<Grid item xs={xs} xl={xl} display="flex" alignItems="center" justifyContent="center">
			
			<Bubble size={size} corner={corner}>
				<Link to={to}>
					<>
						<DashboardImage src={img} alt={caption} width={imgWidth} />
						<div>{caption}</div>
					</>
				</Link>
			
			</Bubble>
		</Grid>
    )
}

const DashboardImage= styled("img")((props: {width?: string}) => {
	console.log("Imgprops", props)
	return ({
		width: (props.width) ? props.width : "150px"
	})
}	
)