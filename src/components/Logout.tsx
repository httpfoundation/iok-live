import { Navigate } from "react-router-dom"

const Logout = () => {
	window.localStorage.removeItem("iok_registration_data")
	window.localStorage.removeItem("welcome")
	window.localStorage.removeItem("ratings")
	window.location.href = "/"
	return null
}

export default Logout