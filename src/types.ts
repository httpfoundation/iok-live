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
	live: boolean
}

export type DatoStaticVideo = {
	name: string
	video: {
		url: string
	}

}

export type DatoStage = {
	id: number
	name: string
	pageTitle: string
	slug: string
	schedule?: DatoTalk[]
	streams?: DatoStream[]
	staticVideo?: DatoStaticVideo
}

export type DatoBreakoutRoom = {
	id: number
	title: string
	slug: string
	roomId?: string
}

export type DatoStaff = {
	id: number
	name: string
	company?: string
	title?: string
	slug?: string
	group?: string
	image?: {
		url: string
	}
}


export type DatoComplex = {
	allStages: DatoStage[]
	allBreakoutrooms: DatoBreakoutRoom[]
	liveStaticElement: DatoLiveStaticElement
	allSpeakers: DatoSpeaker[]
	allMessages: DatoMessage[]
	allStaffs: DatoStaff[]
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
	hoverImg?: string
    link?: string
	onClick?: () => void
	mobileOrder: number
}

export type DatoLiveStaticElement = {
		welcome?: any
		httpCsapat?: any
		iokCafe?: any,
		iokCafeInfo?: any
		iokCafeHandout?: any
		httpMemberPlus?: any
		staff?: any
		junior?: any
		media?: any
		sessionLead?: any
		rating?: any
		menu?: any
		handout?: any
		menuImage?: any
		streamNotLive?: any
	}
