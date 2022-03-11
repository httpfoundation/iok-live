import { Button } from "@mui/material"
import { styled } from '@mui/material/styles'
import { useNavigate } from "react-router-dom"
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material"
import { Box } from "@mui/system"

const BackButton = () => {
	const navigate = useNavigate()
	return <Button size="large" sx={{position: 'absolute', left: '20px', top: '40px'}} variant="outlined" color="primary" onClick={() => navigate(-1)} startIcon={<KeyboardBackspaceIcon />}><Box sx={{transform: 'translateY(2px)'}}>Vissza</Box></Button>
}
export default BackButton