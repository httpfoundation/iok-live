import Link from "./Link";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const DashboardItem = (props: { img: any; caption: string; to: string, xs: number, imgWidth?: string }) => {
    const { img, caption, to, imgWidth } = props;
    return (
		<Grid item xs={12}>
			<Item>
				<Link to={to}>
					<>
						<DashboardImage src={img} alt={caption} width={imgWidth} />
						<div>{caption}</div>
					</>
				</Link>
			</Item>
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