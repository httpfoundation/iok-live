import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from "../Store"

const Header = () => {

	const [activeTab, setActiveTab] = useState<number|null>(0)

	const stages = useStore().stages

	const tabs = useMemo(() => [
		{label: 'Aula', to: '/'},
		{label: 'Recepció', to: '/recepcio'},
		{label: 'Előadók', to: '/eloadok'},
		{label: 'Előadások', to: '/eloadasok'},

		...stages.map(stage => ({label: stage.name, to: `/szekcio/${stage.slug}`})),
		{label: 'ITMP Klub Cafe', to: '/itmp-klub-cafe'},
	], [stages])

	
	
	/* Set active tab on initial load and on navigation based on current location */
	const location = useLocation()

	useEffect(() => {
		const index = tabs.findIndex(tab => tab.to === location.pathname)
		setActiveTab(index === -1 ? null : index)
	}, [location.pathname, tabs])


	return (<AppBar position="fixed" sx={{
		zIndex: theme => theme.zIndex.drawer + 1
	}}>
		<Toolbar>
			<Typography variant="h6" noWrap component="div">
				{/* <SettingsInputAntennaIcon color='secondary' sx={{transform: 'translateY(5px)', mr: 1}} /> */}
				IOK 2022
			</Typography>

			<Tabs value={activeTab} sx={{ flexGrow: 1, height: 64 }} centered>
				{tabs.map((tab, index) => <Tab key={index} label={tab.label} sx={{height: 64}} component={Link}  to={tab.to} />)}
			</Tabs>
		</Toolbar>
	</AppBar>)
}

export default Header