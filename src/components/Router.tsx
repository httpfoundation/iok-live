import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Presenters from "../pages/Presenter/PresenterRouter"
import Talks from "../pages/Talk/TalkRouter"
import StagePage from '../pages/Stage/Stage'
import Home from "../pages/Home/Home"
import Reception from "../pages/Reception/Reception"
import BreakoutRoom from "../pages/BreakoutRoom/BreakoutRoom"
import Sponsors from "../pages/Sponsors/Sponsors"
import { useEffect, useState } from "react"
import Welcome from "../pages/Welcome"
import About from "../pages/About"
import MessageBoard from "../pages/MessageBoard"


const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		
		document.getElementById("main")?.scrollTo(0, 0)
	}, [pathname])

	return null
}


const Router = () =>{
	const { pathname } = useLocation()
	const [isWelcomeVisited, setIsWelcomeVisited] = useState(window.localStorage.getItem("welcome")==="true")
	useEffect(() => {
		setIsWelcomeVisited(window.localStorage.getItem("welcome")==="true")
	}, [pathname])
	console.log("isWelcomeVisited", isWelcomeVisited)
	return (
		<>
		<ScrollToTop />
		<Routes>
			{/* Home */}
			<Route index element={(isWelcomeVisited) ?  <Home /> : <Navigate to="/koszonto/" />} />
			{/* Reception */}
			<Route path="/recepcio" element={<Reception />} />
			{/* Welcome */}
			<Route path="/koszonto/*" element={<Welcome />} />
			{/* Stage */}
			<Route path={"/stage/:stageId"} element={<StagePage />} />
			<Route path={"/szekcio/:stageId"} element={<StagePage />} />
			{/* Presenter */}
			<Route path="/presenters/*" element={<Presenters />} />
			<Route path="/eloadok/*" element={<Presenters />} />
			{/* Talks / Presentations */}
			<Route path="/presentations/*" element={<Talks />} />
			<Route path="/eloadasok/*" element={<Talks />} />
			
			<Route path="/http-csapat/*" element={<About />} />
			<Route path="/uzenofal/*" element={<MessageBoard />} />
			<Route path="/iok-cafe/*" element={<BreakoutRoom />} />
			<Route path="/tamogatok" element={<Sponsors />} />
		</Routes>
		</>
	)
}

export default Router