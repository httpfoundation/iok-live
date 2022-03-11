declare module 'datocms-client' {
	export class SiteClient {
		constructor(token: string)
		items: {
			create: (data: ({ itemType: string} & Record<string, any>)) => Promise<any>
		}
	}
}