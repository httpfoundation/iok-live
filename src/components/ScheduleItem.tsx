import { DatoTalk } from "../types"

/* Egy napirendi pont komponense */
const ScheduleItem = (props: {
	open: boolean
	talk: DatoTalk
}) => {
	const double = false

	const { talk } = props

	return (
		<div
			className={`shcedule-item ${props.open ? "open" : ""} ${
				double ? "double-presenter" : ""
			}`}
			//onClick={props.onClick}
		>
			<div className="images">
				{props.talk.speaker?.map((speaker) => (
					<div
						key={speaker.id}
						className="image"
						style={{
							backgroundImage:
								"url('" + speaker.image?.url + "')",
						}}
					></div>
				))}
			</div>
			<div className="content">
				<div className="time">
					<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.5 18.25C4.66738 18.25 0.75 14.3326 0.75 9.5C0.75 4.66738 4.66738 0.75 9.5 0.75C14.3326 0.75 18.25 4.66738 18.25 9.5C18.25 14.3326 14.3326 18.25 9.5 18.25ZM9.5 16.5C11.3565 16.5 13.137 15.7625 14.4497 14.4497C15.7625 13.137 16.5 11.3565 16.5 9.5C16.5 7.64348 15.7625 5.86301 14.4497 4.55025C13.137 3.2375 11.3565 2.5 9.5 2.5C7.64348 2.5 5.86301 3.2375 4.55025 4.55025C3.2375 5.86301 2.5 7.64348 2.5 9.5C2.5 11.3565 3.2375 13.137 4.55025 14.4497C5.86301 15.7625 7.64348 16.5 9.5 16.5V16.5ZM10.375 9.5H13.875V11.25H8.625V5.125H10.375V9.5Z"/>
					</svg>
					{talk.start}
				</div>
				<div className="title">{talk.title}</div>
				{talk?.speaker?.map((speaker) => (
					<div
						key={speaker.id}
						className="presenter"
					>{`${speaker.name}, ${speaker.title}, ${speaker.company}`}</div>
				))}
				<div className="description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Rerum repellendus eos voluptas cupiditate quasi labore et
					velit asperiores minus recusandae a dignissimos, quis natus
					numquam cumque quod dicta placeat incidunt.
				</div>
			</div>
		</div>
	)
}

export default ScheduleItem