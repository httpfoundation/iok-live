import { Routes, Route } from "react-router-dom"
import Presenter from "../pages/Presenter/Presenter"
import StagePage from '../pages/Stage/Stage'


const Router = () =>{
	return (
		<Routes>
			<Route path="/stage/:stageId" element={<StagePage />} />
			<Route path="/presenter" element={<Presenter />} />
		</Routes>
	)
}

export default Router