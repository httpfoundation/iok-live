import { Typography, TypographyProps } from "@mui/material"
import { styled } from '@mui/material/styles'
import React from "react"

const PageTitleStyled = styled(Typography)<TypographyProps>(({theme}) => `
	text-align: center;
	margin: ${theme.spacing(3)} 0;
`)

const PageTitle = (props: {children: React.ReactElement|string}) => <PageTitleStyled variant="h1">{props.children}</PageTitleStyled>
export default PageTitle