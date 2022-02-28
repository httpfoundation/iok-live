import { Link as ReactRouterLink } from "react-router-dom"
import {default as MuiLink} from '@mui/material/Link'

const Link = (props) => {return (
        <MuiLink component={ReactRouterLink} underline="none" {...props}>{props.children}</MuiLink>
)}

export default Link