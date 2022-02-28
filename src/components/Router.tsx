import { Routes, Route } from "react-router-dom"
import Presenters from "../pages/Presenter/PresenterRouter"
import Talks from "../pages/Talk/TalkRouter"
import StagePage from '../pages/Stage/Stage'


const Router = () =>{
	return (
		<Routes>
			{/* Stage */}
			<Route path={"/stage/:stageId"} element={<StagePage />} />
			<Route path={"/szekcio/:stageId"} element={<StagePage />} />
			{/* Presenter */}
			<Route path="/presenters/*" element={<Presenters />} />
			<Route path="/eloadok/*" element={<Presenters />} />
			{/* Talks / Presentations */}
			<Route path="/presentations/*" element={<Talks />} />
			<Route path="/eloadasok/*" element={<Talks />} />
		</Routes>
	)
}

export default Router