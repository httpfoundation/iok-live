import { useEffect, useState } from "react"
import { useQuerySubscription } from "react-datocms"
import { SiteClient } from "datocms-client"

const token = "696914918819c8ed705237629cfe47"

export type QueryError = {
	code: string
	message: string
	fatal: boolean
}

const useQuery = <T>(query: string, initialValue: T) : [T, QueryError | null] => {
	const [result, setResult] = useState<T>(initialValue)
	const { data, error } = useQuerySubscription({
		query,
		enabled: true,
		token
	})
	useEffect(() => {
		if (data) setResult(Object.keys(data).length === 1 ? data[Object.keys(data)[0]] : data)
	}, [data])
	useEffect(() => {
		setResult(initialValue)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])
	return [result, error]
}

export const client = new SiteClient(token)

export default useQuery