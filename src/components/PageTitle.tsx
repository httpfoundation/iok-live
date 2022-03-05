import { Typography } from "@mui/material"

const PageTitle = (props) => {
	return (
		<>
			<Typography variant="h1" sx={{textAlign: 'center', m: 4, fontSize: 45}}>{props.children}</Typography>
		</>
	)
}

export default PageTitle