import { Typography } from "@mui/material"

const PageTitle = (props) => {
	return (
		<>
			<Typography variant="h2">{props.children}</Typography>
		</>
	)
}

export default PageTitle