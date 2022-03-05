import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Chip from '@mui/material/Chip'

import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/PeopleAlt'
import CoffeeIcon from '@mui/icons-material/Coffee'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import StarIcon from '@mui/icons-material/Star'
import EventNoteIcon from '@mui/icons-material/EventNote'
import LiveTvIcon from '@mui/icons-material/LiveTv'

import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStages } from "../Store"

const Header = () => {

	//const [activeTab, setActiveTab] = useState<number|null>(0)

	const [drawerOpen, setDrawerOpen] = useState(false)

	const stages = useStages()

	/*
	const tabs = useMemo(() => [
		{label: 'Aula', to: '/'},
		{label: 'Recepció', to: '/recepcio'},
		{label: 'Előadók', to: '/eloadok'},
		{label: 'Előadások', to: '/eloadasok'},

		...stages.map(stage => ({label: stage.name, to: `/szekcio/${stage.slug}`})),
		{label: 'ITMP Klub Cafe', to: '/itmp-klub-cafe'},
	], [stages])
	*/

	const menuItems = useMemo<(({label: string, to: string, icon: React.ReactElement | null, divider?: false, live?: boolean}|{divider: true, label?: string})[])>(() => [
		{label: 'Aula', to: '/', icon: <HomeIcon />},
		{label: 'Recepció', to: '/recepcio', icon: <HomeIcon />},
		{label: 'Program', to: '/eloadasok', icon: <EventNoteIcon />},
		{label: 'Előadók', to: '/eloadok', icon: <PeopleIcon />},
		{label: 'ITMP Klub Cafe', to: '/itmp-klub-cafe', icon: <CoffeeIcon />},
		{label: 'Támogatók', to: '/tamogatok', icon: <StarIcon />},
		{divider: true},
		{label: 'Szekciók', divider: true},
		...stages.map(stage => ({label: stage.name, to: `/szekcio/${stage.slug}`, icon: null, live: true})),
		{divider: true},
	], [stages])
	
	
	const location = useLocation()
	/*
	useEffect(() => {
		const index = tabs.findIndex(tab => tab.to === location.pathname)
		setActiveTab(index === -1 ? null : index)
	}, [location.pathname, tabs])
	*/

	return (<>
		<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<Box sx={{ width: 370, pt: '64px' }} role="presentation">
				<List>
					{menuItems.map((menuItem, index) => {

						if (menuItem.divider && menuItem.label) return <ListSubheader><LiveTvIcon sx={{mr: 1, transform: 'translateY(4px)', color: 'rgba(0, 0, 0, 0.4)'}} />{menuItem.label}</ListSubheader>
						if (menuItem.divider) return <Divider />
						const selected = menuItem.to === location.pathname
						return (
							<ListItemButton selected={selected} key={index} component={Link} to={menuItem.to} onClick={() => setDrawerOpen(false)}>
								{
									menuItem.icon && (
									<ListItemIcon>
										<Avatar sx={{ bgcolor: selected ? 'secondary.main' : '' }}>{menuItem.icon}</Avatar>
									</ListItemIcon>)
								}
								<ListItemText>
									<span style={{fontWeight: selected ? 600 : 500}}>{menuItem.label}</span>
									{/* { menuItem.live && <Chip  size="small" label="ÉLŐ" sx={{backgroundColor: "#d22d32bd", color: '#fff', ml: 1, '>span': {fontSize: 10, fontFamily: '"Roboto", sans-serif'}}} /> } */}
								</ListItemText>
							</ListItemButton>
						)
					})}
				</List>
			</Box>
		</Drawer>
		
		<AppBar position="fixed"  color="secondary" sx={{
			zIndex: theme => theme.zIndex.drawer + 1
		}}>
			<Toolbar>
				<Typography variant="h6" noWrap sx={{flex: 1, transform: 'translateY(2px)'}}>
					{/* <SettingsInputAntennaIcon color='secondary' sx={{transform: 'translateY(5px)', mr: 1}} /> */}
					<Link to="/"><b>IOK</b> 2022</Link>
				</Typography>

				{/*	<Tabs value={activeTab} sx={{ flexGrow: 1, height: 64 }} centered>
					{tabs.map((tab, index) => <Tab key={index} label={tab.label} sx={{height: 64}} component={Link}  to={tab.to} />)}
				</Tabs> */}

				<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
           			<MenuIcon />
          		</IconButton>
			</Toolbar>
		</AppBar>
		{location.pathname !== "/" && (
			<Zoom in>
				<Tooltip title="Vissza az aulába" placement="left" arrow>
					<Fab color="secondary" aria-label="home" sx={{position: 'absolute', right: 30, bottom: 30}} component={Link} to="/" >
						<HomeIcon />
					</Fab>
				</Tooltip>
			</Zoom>
			)
		}
	</>)
}

export default Header