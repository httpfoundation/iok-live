import { createContext, useContext } from "react"
import { DatoStage, DatoSpeaker } from "./types"
import useQuery from "./useQuery"

export interface IStore {
	stages: DatoStage[],
	presenters: DatoSpeaker[],
}

export const Store = createContext<IStore>({
	stages: [],
	presenters: [],
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

	const store = {
		stages,
		presenters,
	}

	return (
		<Store.Provider value={store}>{props.children}</Store.Provider>
	)
}

export const useStore = () => {
	const store = useContext(Store)
	return store
}

export default Store