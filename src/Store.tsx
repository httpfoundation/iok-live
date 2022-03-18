import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DatoStage, DatoSpeaker, DatoTalk, DatoComplex, DatoBreakoutRoom, DatoLiveStaticElement, DatoMessage, DatoStaff } from "./types"
import useQuery from "./useQuery"

export interface IStore {
	stages: DatoStage[],
	presenters: DatoSpeaker[],
	talks: DatoTalk[],
	breakoutRooms: DatoBreakoutRoom[],
	pageTitle: string, 
	setPageTitle: (title: string) => void,
	registration: RegistrationData|null,
	registrationLoading: boolean,
	registrationError: boolean,
	liveStaticElements: DatoLiveStaticElement
	messages: DatoMessage[]
	staff: DatoStaff[]
}

export const Store = createContext<IStore>({
	stages: [],
	presenters: [],
	talks: [],
	breakoutRooms: [],
	pageTitle: "IOK 2022",
	setPageTitle: (t: string) => {},
	registration: null,
	registrationLoading: true,
	registrationError: false,
	liveStaticElements: {},
	messages: [],
	staff: []
})

type RegistrationData = {
	id: number
	name: string
	dato_token: string
	webex_access_token: string
	onsite: boolean
	stage: number | null
}

const useRegistrationData = (regId: string|null) : [RegistrationData|null, boolean, boolean] => {
	const [registrationData, setRegistrationData] = useState<RegistrationData|null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		(async () => {
			if (regId && String(regId) !== String(JSON.parse(window.localStorage.getItem("iok_registration_data") as string)?.id)) {
				console.log('FETCH REGISTRATION DATA')
				window.localStorage.removeItem("iok_registration_data")
				const res = await fetch("https://wy8qg2hpoh.execute-api.eu-west-1.amazonaws.com/default/iokRegistrationData?id=" + regId)
				const data = await res.json()
				if (data.id) {
					setRegistrationData(data)
					window.localStorage.setItem("iok_registration_data", JSON.stringify(data))
					window.history.replaceState(null, '', window.location.href.replace(window.location.search, ""))
				} else {
					setError(true)
				}
			} else if (window.localStorage.getItem("iok_registration_data")) {
				setRegistrationData(JSON.parse(window.localStorage.getItem("iok_registration_data") as string))
			}
			setLoading(false)
		})()
	}, [regId])

	return [registrationData, loading, error]
}

export const StoreProvider = (props: { children: React.ReactElement }) => {
	const [data] = useQuery<DatoComplex>(`
		{
			allStages(orderBy: [order_ASC]) {
				id
				name
				pageTitle
				slug
				staticVideo {
					url
					name
				}
				streams {
					id
					name
					youtubeVideoId
					live
					language {
						id
						name
						slug
						image {
							url
						}
					}
				}
				schedule {
					id
					title
					start
					description
					speaker {
						id
					}
				}
			}
			allBreakoutrooms {
				description {
				  value
				}
				title
				roomId
			}
			liveStaticElement {
				welcome {
				  value
				}
				httpCsapat {
					value
				}
				iokCafe {
					value
				}
				iokCafeInfo {
					value
				}
				iokCafeHandout {
					value
				}
				httpMemberPlus {
					value
				}
				staff {
					value
				}
				junior {
					value
				}
				media {
					value
				}
				sessionLead {
					value
				}
				rating {
					value
				}
				menu {
					value
				}
				handout {
					value
				}
				menuImage {
					url
				}
				streamNotLive {
					value
				}			
			}
			allSpeakers(first: 100) {
				id
				name
				title
				company
				slug
				bio
				image {
					url
				}
			}
			allMessages(first: 100) {
				id
				createdAt
				title
				message {
					value
				}
				level
				staff {
					name
					image {
						url
					}
				}
			}
			allStaffs {
				id
				name
				title
				company
				image {
				  url
				}
				group
				slug
			}
	  	}
	`, {allStages: [], allBreakoutrooms: [], liveStaticElement: {}, allSpeakers: [], allMessages: [], allStaffs: []})

	const {allStages : stages, allBreakoutrooms: breakoutRooms, liveStaticElement: liveStaticElements, allSpeakers: presenters, allMessages: messages, allStaffs: staff} = data

	const talks = useMemo(() => {
		const talks: DatoTalk[] = []
		stages.forEach(stage => {
			const stageTalks = stage?.schedule?.map(talk => ({
				...talk,
				stage: {
					...stage,
					schedule: undefined
				}
			})) ?? []
			talks.push(...stageTalks)
		})
		return talks
	}, [stages])

	const [pageTitle, setPageTitle] = useState("IOK 2022")

	const regId = (new URLSearchParams(window.location.search)).get('q') || null
	const [registration, registrationLoading, registrationError] = useRegistrationData(regId)

	const store:IStore = useMemo(() => ({
		stages,
		presenters,
		talks,
		breakoutRooms,
		pageTitle,
		setPageTitle,
		registration,
		registrationLoading,
		registrationError,
		liveStaticElements,
		messages,
		staff
	}), [stages, presenters, talks, breakoutRooms, pageTitle, setPageTitle, registration, registrationLoading, registrationError, liveStaticElements, messages, staff])

	return <Store.Provider value={store}>{props.children}</Store.Provider>
}

export const useStore = () => {
	const store = useContext(Store)
	return store
}

export const usePresenterWithTalksByStage = (presenterSlug: string|null) => {

	const store = useStore()

	const stages = store.stages
	const presenter = useMemo(() => store.presenters.find(p => p.slug === presenterSlug), [presenterSlug, store.presenters])

	const talksByStage = useMemo(() => 
		stages.map(stage => (
			{...stage, schedule: stage.schedule?.filter(talk => talk.speaker.filter(speaker => speaker.id === presenter?.id).length)}
		)).filter(stage => stage.schedule?.length)
	, [stages, presenter?.id])


	return useMemo(() => ({...presenter, talksByStage}), [presenter, talksByStage])
}

export const usePresenters = () => {
	const store = useStore()
	return store.presenters
}

export const useStages = () => {
	const store = useStore()
	return store.stages
}

export const useLiveStaticElements = () => {
	const store = useStore()
	return store.liveStaticElements
}


export const useStage = (stageSlug?: string) => {
	const store = useStore()
	const index = store.stages.findIndex(stage => stage.slug === stageSlug)
	return {...store.stages[index], prevStage: index > 0 ? store.stages[index - 1] : null, nextStage: index < store.stages.length - 1 ? store.stages[index + 1] : null}
}

export const useBreakoutRooms = (stageSlug?: string) => {
	const store = useStore()
	return store.breakoutRooms
}

export const useStaff = (group?: string) => {
	const store = useStore()
	if (group) return store.staff.filter(member => member.group===group)
	return store.staff
}


export const useTalk = (talkId?: string|number) => {
	const store = useStore()

	const talk = useMemo(() => store.talks.find(t => String(t.id) === String(talkId)), [talkId, store.talks])
	const speakerIds = useMemo(() => talk?.speaker?.map(s => s.id), [talk?.speaker])
	const speakers = useMemo(() => store.presenters.filter(p => speakerIds?.includes(p.id)), [store.presenters, speakerIds])

	return useMemo(() => ({...talk, speakers}), [talk, speakers])
}
export const useSetPageTitle = () => {
	const store = useStore()
	return store.setPageTitle
}

export const usePageTitle = () => {
	const store = useStore()
	return store.pageTitle
}

export const useRegistration = (): [RegistrationData|null, boolean, boolean] => {
	const store = useStore()
	return [store.registration, store.registrationLoading, store.registrationError]
}

export const useMessages = () => {
	const store = useStore()
	return store.messages
}

export default Store