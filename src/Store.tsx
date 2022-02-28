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

export default Store