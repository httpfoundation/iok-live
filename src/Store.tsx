import { createContext, useContext, useMemo, useState } from "react"
import { DatoStage, DatoSpeaker, DatoTalk, DatoComplex, DatoBreakoutRoom } from "./types"
import useQuery from "./useQuery"

export interface IStore {
	stages: DatoStage[],
	presenters: DatoSpeaker[],
	talks: DatoTalk[],
	breakoutRooms: DatoBreakoutRoom[],
	pageTitle: string, 
	setPageTitle: (title: string) => void,
}

export const Store = createContext<IStore>({
	stages: [],
	presenters: [],
	talks: [],
	breakoutRooms: [],
	pageTitle: "IOK 2022",
	setPageTitle: (t: string) => {},
})

export const StoreProvider = (props: { children: React.ReactElement }) => {
	const [data] = useQuery<DatoComplex>(`
		{
			allStages(orderBy: [order_ASC]) {
				id
				name
				slug
				streams {
					id
					name
					youtubeVideoId
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
				meetingDestination
			}
	  	}
	`, {allStages: [], allBreakoutrooms: []})

	const {allStages : stages, allBreakoutrooms: breakoutRooms} = data

	const [presenters] = useQuery<DatoSpeaker[]>(`
		{
			allSpeakers(first: 100) {
				id
				name
				title
				company
				slug
				image {
					url
				}
			}
	  	}
	`, [])

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

	const store:IStore = useMemo(() => ({
		stages,
		presenters,
		talks,
		breakoutRooms,
		pageTitle,
		setPageTitle
	}), [stages, presenters, talks, breakoutRooms, pageTitle, setPageTitle])

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

export const useStage = (stageSlug?: string) => {
	const store = useStore()
	return store.stages.find(stage => stage.slug === stageSlug)
}

export const useBreakoutRooms = (stageSlug?: string) => {
	const store = useStore()
	return store.breakoutRooms
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

export default Store