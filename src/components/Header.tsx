import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useQuery from '../useQuery'
import { DatoStage } from '../types'

const Header = () => {

	const [activeTab, setActiveTab] = useState(0)

	//const stages = useApi<Stage[]>(useCallback(() => Api.Event.id(1).Stage.findAll(), []), [])

	const [stages] = useQuery<DatoStage[]>(`
		query {
			allStages(orderBy: [order_ASC]) {
				id
				name
				slug
			}
		}
	`, [])

	return (<AppBar position="fixed" sx={{
		zIndex: theme => theme.zIndex.drawer + 1
	}}>
		<Toolbar>
			<Typography variant="h6" noWrap component="div">
				{/* <SettingsInputAntennaIcon color='secondary' sx={{transform: 'translateY(5px)', mr: 1}} /> */}
				IOK 2022
			</Typography>

			<Tabs value={activeTab} onChange={(e,v) => setActiveTab(v)} sx={{ flexGrow: 1, height: 64 }} centered>
				{stages.map(stage => <Tab key={stage.id} label={stage.name} sx={{height: 64}} component={Link}  to={`/stage/${stage.slug}`} />)}
			</Tabs>
		</Toolbar>
	</AppBar>)
}

export default Header