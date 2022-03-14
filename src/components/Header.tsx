import { AppBar, Toolbar, Typography, Drawer, List, ListItemText, ListItemIcon, ListItemButton, ListSubheader, Box, IconButton, Avatar, Divider, Fab, Tooltip, Zoom } from '@mui/material'

import { Home as HomeIcon, Menu as MenuIcon, People as PeopleIcon, Coffee as CoffeeIcon, Star as StarIcon, EventNote as EventNoteIcon, LiveTv as LiveTvIcon, Logout as LogoutIcon } from '@mui/icons-material'

import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStages, usePageTitle, useRegistration } from "../Store"
import iokLogo from "../assets/images/iok2022_logo_w_httpw_sm.png"
import {styled} from "@mui/system"

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
	const [registration, loading] = useRegistration()
	const stages = useStages()

	const menuItems = useMemo<(MenuItem | DividerMenuItem)[]>(() => [
		//{label: 'Aula', to: '/', icon: <HomeIcon />},
		//{label: 'Recepció', to: '/recepcio', icon: <HomeIcon />},
		{label: 'Köszöntő', to: '/koszonto', icon: <EventNoteIcon />},
		{label: 'Program', to: '/eloadasok', icon: <EventNoteIcon />},
		{label: 'Előadók', to: '/eloadok', icon: <PeopleIcon />},
		{divider: true},
		{label: 'Szekciók', divider: true, icon: <LiveTvIcon sx={{mr: 1, transform: 'translateY(5px)', color: 'rgba(0, 0, 0, 0.4)'}} />},
		...stages.map(stage => ({label: stage.name, to: `/szekcio/${stage.slug}`})),
		{divider: true},
		{label: 'IOK Cafe', to: '/iok-cafe', icon: <CoffeeIcon />},
		{label: 'Támogatók', to: '/tamogatok', icon: <StarIcon />},
		{label: 'Értékelő űrlap', to: '/ertekeles', icon: <StarIcon />},
		{divider: true},
		{label: 'Kijelentkezés', to: '/kijelentkezes', icon: <LogoutIcon />},
	], [stages])

	const pageTitle = usePageTitle()
	useEffect(() => {
		document.title = pageTitle ? "IOK 2022 | " + pageTitle : "IOK 2022"
	}, [pageTitle])
	
	
	const location = useLocation()

	useEffect(() => setDrawerOpen(false), [location.pathname])

	return (<>
		<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<Box sx={{ width: 370, pt: '64px', maxWidth: 'calc(100vw - 20px)' }} role="presentation">
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
				<Box sx={{flex: '0 0 auto', transform: 'translateY(2px)'}}>
					<Link to="/"><Logo src={iokLogo} />	</Link>
				</Box>
				<Typography variant="h6" noWrap sx={{flex: 1, transform: 'translateY(2px)'}} align="center">
					{/* {pageTitle} */}
				</Typography>
				<Typography variant="h6" noWrap sx={{flex: '0 0 auto', transform: 'translateY(2px)', mr: 2, display: {xs: 'none', md: 'block'}}} align="center">
					{registration?.name}
				</Typography>
				<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
           			<MenuIcon />
          		</IconButton>
			</Toolbar>
		</AppBar>
		{location.pathname !== "/" && (
			<Zoom in>
				<Tooltip title="Vissza az aulába" placement="bottom" arrow>
					<Fab color="secondary" aria-label="home" sx={{position: 'absolute', right: 30, top: 80, zIndex: 800}} component={Link} to="/" >
						<HomeIcon />
					</Fab>
				</Tooltip>
			</Zoom>
			)
		}
	</>)
}

const Logo = styled('img')`
	padding-top:5px;
	height: 38px;
	width: 207px
	

`

export default Header