import { LiveTv as LiveTvIcon, AccessTime as TimeIcon } from "@mui/icons-material"
import { Chip, Stack, Tooltip } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { PageContainer, PageTitle, Paragraph } from "../../components"
import PresenterCard, { PresenterGrid } from "../../components/PresenterCard"
import { useTalk } from "../../Store"

export const SingleTalk = () => {

	const { talkSlug } = useParams()

	const talk = useTalk(talkSlug)

	return (
		<PageContainer container>
			<PageTitle align="left">{talk?.title}</PageTitle>
			<Stack direction="row" spacing={2} >
			<Chip label={talk.start && new Date(talk.start).toLocaleString('hu-hu', { minute: 'numeric', hour: 'numeric' })} icon={<TimeIcon />} sx={{}}/>
			<Tooltip title="Közvetítés megtekintése" placement="right" arrow>
				<Chip clickable component={Link} to={`/szekcio/${talk?.stage?.slug}`} label={`"${talk?.stage?.name}" szekció`} icon={<LiveTvIcon />} sx={{pl: 1}} />
			</Tooltip>
			</Stack>
			<Paragraph>{talk.description}</Paragraph>
			<PresenterGrid>
				{ talk.speakers.map((speaker, index)=> (
					<PresenterCard presenter={speaker} key={index} />
				))}
			</PresenterGrid>
			
		</PageContainer>
	)
}

export default SingleTalk