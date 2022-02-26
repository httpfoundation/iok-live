import { Routes, Route } from "react-router-dom"
import Presenter from "../pages/Presenter/PresenterRouter"
import StagePage from '../pages/Stage/Stage'


const Router = () =>{
	return (
		<Routes>
			{/* Stage */}
			<Route path={"/stage/:stageId"} element={<StagePage />} />
			<Route path={"/szekcio/:stageId"} element={<StagePage />} />
			{/* Presenter */}
			<Route path="/presenter/*" element={<Presenter />} />
			<Route path="/eloadok/*" element={<Presenter />} />
		</Routes>
	)
}

export default Router