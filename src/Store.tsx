import { createContext, useContext, useMemo } from "react"
import { DatoStage, DatoSpeaker, DatoTalk } from "./types"
import useQuery from "./useQuery"

export interface IStore {
	stages: DatoStage[],
	presenters: DatoSpeaker[],
	talks: DatoTalk[]
}

export const Store = createContext<IStore>({
	stages: [],
	presenters: [],
	talks: []
})

export const StoreProvider = (props: { children: React.ReactElement }) => {
	const [stages] = useQuery<DatoStage[]>(`
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
	  	}
	`, [])

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

	const store = {
		stages,
		presenters,
		talks
	}

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

export const useTalk = (talkId?: string|number) => {
	const store = useStore()

	const talk = useMemo(() => store.talks.find(t => String(t.id) === String(talkId)), [talkId, store.talks])
	const speakerIds = useMemo(() => talk?.speaker?.map(s => s.id), [talk?.speaker])
	const speakers = useMemo(() => store.presenters.filter(p => speakerIds?.includes(p.id)), [store.presenters, speakerIds])

	return useMemo(() => ({...talk, speakers}), [talk, speakers])
}


export default Store