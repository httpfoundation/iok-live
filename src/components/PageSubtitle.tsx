import { Typography, TypographyProps } from "@mui/material"
import { styled } from '@mui/material/styles'

const PageSubtitleStyled = styled(Typography)<TypographyProps>(({theme}) => `
	text-align: "left";
	font-size: 21px;
	font-weight: 500;
	margin: -${theme.spacing(2)} 0 0 0;
`)

const PageSubtitle = (props: {children?: React.ReactNode}) => <PageSubtitleStyled  variant="h2">{props.children}</PageSubtitleStyled>
export default PageSubtitle