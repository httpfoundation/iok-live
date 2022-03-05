import { AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemIcon, ListItemButton, ListSubheader, Box, IconButton, Avatar, Divider, Fab, Tooltip, Zoom } from '@mui/material'

import { Home as HomeIcon, Menu as MenuIcon, People as PeopleIcon, Coffee as CoffeeIcon, Star as StarIcon, EventNote as EventNoteIcon, LiveTv as LiveTvIcon } from '@mui/icons-material'

import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStages } from "../Store"

type MenuItem = {
	label: string,
	to: string,
	icon?: React.ReactElement,
	divider?: false
}
type DividerMenuItem = {
	divider: true,
	label?: string,
	icon?: React.ReactElement
}

const Header = () => {

	const [drawerOpen, setDrawerOpen] = useState(false)

	const stages = useStages()

	const menuItems = useMemo<(MenuItem | DividerMenuItem)[]>(() => [
		{label: 'Aula', to: '/', icon: <HomeIcon />},
		{label: 'Recepció', to: '/recepcio', icon: <HomeIcon />},
		{label: 'Program', to: '/eloadasok', icon: <EventNoteIcon />},
		{label: 'Előadók', to: '/eloadok', icon: <PeopleIcon />},
		{label: 'ITMP Klub Cafe', to: '/itmp-klub-cafe', icon: <CoffeeIcon />},
		{label: 'Támogatók', to: '/tamogatok', icon: <StarIcon />},
		{divider: true},
		{label: 'Szekciók', divider: true, icon: <LiveTvIcon sx={{mr: 1, transform: 'translateY(5px)', color: 'rgba(0, 0, 0, 0.4)'}} />},
		...stages.map(stage => ({label: stage.name, to: `/szekcio/${stage.slug}`})),
		{divider: true},
	], [stages])
	
	
	const location = useLocation()

	useEffect(() => setDrawerOpen(false), [location.pathname])

	return (<>
		<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<Box sx={{ width: 370, pt: '64px' }} role="presentation">
				<List>
					{menuItems.map((menuItem, index) => {

						if (menuItem.divider && menuItem.label) return <ListSubheader key={index}>{menuItem.icon ?? null}{menuItem.label}</ListSubheader>
						if (menuItem.divider) return <Divider key={index} />
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
								</ListItemText>
							</ListItemButton>
						)
					})}
				</List>
			</Box>
		</Drawer>
		
		<AppBar position="fixed" color="secondary" sx={{
			zIndex: theme => theme.zIndex.drawer + 1
		}}>
			<Toolbar>
				<Typography variant="h6" noWrap sx={{flex: 1, transform: 'translateY(2px)'}}>
					<Link to="/"><b>IOK</b> 2022</Link>
				</Typography>

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