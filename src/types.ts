import { StructuredTextDocument } from "react-datocms"

export type DatoSpeaker = {
	id: number
	name: string
	bio: string
	title: string
	company: string
	slug: string
	image?: {
		url: string
	}
	talk: DatoTalk[]
}

export type DatoTalk = {
	id: number
	title: string
	start: Date
	description: string
	//speaker?: DatoSpeaker[]
	speaker: {
		id: number
	}[]
	stage?: DatoStage
}

export type DatoLanguage = {
	id: number
	name: string
	slug: string
	image?: {
	url: string
	}
}

export type DatoStream = {
	id: number
	name: string
	youtubeVideoId: string
	language: DatoLanguage
}

export type DatoStage = {
	id: number
	name: string
	pageTitle: string
	slug: string
	schedule?: DatoTalk[]
	streams?: DatoStream[]
}

export type DatoBreakoutRoom = {
	id: number
	name: string
	slug: string
	meetingDestination?: string
}


export type DatoComplex = {
	allStages: DatoStage[]
	allBreakoutrooms: DatoBreakoutRoom[]
	liveStaticElement: DatoLiveStaticElement
	allSpeakers: DatoSpeaker[]
	allMessages: DatoMessage[]
}

export type DatoStaff = {
	name: string
	image: {
		url: string
	}
}

export type DatoMessage = {
	id: number
	title: string
	message: StructuredTextDocument
	level: 1 | 2 | 3
	staff?: DatoStaff
	createdAt: string
}

export type DashboardItemType = {
    caption: string
    title: string
    corner: 'bl' | 'br' | 'tl' | 'tr' | 'none'
    light: boolean
    img: string
    link?: string
	onClick?: () => void
}

export type DatoLiveStaticElement = {
		welcome?: any
		httpCsapat?: any
		iokCafe?: any,
		iokCafeInfo?: any,
		iokCafeHandout?: any
		httpMemberPlus?: any
	}
