import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRegistration } from '../Store'
import { useDatoClient } from '../useQuery'

const attendanceIntervalMinutes = 5

export const Attendance = () => {

	const [interval, setInterval] = useState<number>()
	const [registration] = useRegistration()
	const client = useDatoClient()
	const location = useLocation()
	const [lastPath, setLastPath] = useState<string>(location.pathname)

	const sendAttendance = async () => {
		const attendanceId = window.localStorage.getItem('iok_attendance_id')
		if (!registration?.id || !attendanceId)
			return
		try {
			const attendance = await client?.item.find(attendanceId)
			if (attendance) {
				await client?.item.update(attendanceId, {
					attendances: JSON.stringify([...(JSON.parse(attendance.attendances)), { date: new Date(), path: window.location.pathname }])
				})
				console.log("Sent attendance")
			}
		} catch (e) {
			console.error("Failed to send attendance", e)
		}
	}

	const createAttendance = async () => {
		if (!registration?.id)
			return
		try {
			const res = await client?.items.create({
				itemType: '1961614',
				registration: String(registration?.id) ?? null,
				attendances: JSON.stringify([])
			})
			console.log("Created attendance")
			window.localStorage.setItem("iok_attendance_id", res.id)
		} catch (e) {
			if ((e as any).message.includes("VALIDATION_UNIQUE")) {
				console.log("Attendance already exists")
				const attendances = await client?.items.all({
					filter: {
						type: 'attendance',
						fields: {
							registration: {
								eq: registration?.id
							}
						}
					},
					page: {
						limit: 1
					}
				})
				if (attendances.length) {
					window.localStorage.setItem("iok_attendance_id", attendances[0].id)
				}
			} else {
				console.error("Failed to create attendance", e)
			}
		}
	}

	useEffect(() => {
		if (registration && !interval) {
			(async () => {
				await createAttendance()
				await sendAttendance()
				setInterval(window.setInterval(sendAttendance, attendanceIntervalMinutes * 60 * 1000))
			})()
		}
		return () => {
			if (interval) {
				window.clearInterval(interval)
			}
		}
	}, [])

	useEffect(() => {
		if (registration && interval && (lastPath.includes("szekcio") || location.pathname.includes("szekcio"))) {
			sendAttendance()
			setLastPath(location.pathname)
		}
	}, [location.pathname])

	return null
}


export default Attendance