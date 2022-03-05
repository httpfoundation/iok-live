import { DatoLanguage } from "../../types"
import { Chip, Avatar } from "@mui/material"
import { Done as DoneIcon, Language as LanguageIcon } from "@mui/icons-material"


const LanguageSelect = (props: {
	options?: DatoLanguage[]
	value: number | null
	onChange: (language: number | null) => void
}) => {

	const { options, value, onChange } = props

	if (options && !options.length) return null

	//if (options && options.length === 1) return <Chip avatar={<Avatar alt={} src="/static/images/avatar/1.jpg" /> label={options[0].name} icon={<LanguageIcon />} />

	return (
		<>
			{options?.map(option => <Chip
					sx={{mr: 1, fontSize: '0.8rem', fontFamily: 'sans-serif', fontWeight: value === option.id ? '700' : '600'}}
					variant={value === option.id ? "filled" : "outlined"}
					avatar={option.image?.url ? <Avatar alt={option.name} src={option.image?.url} /> : undefined}
					key={option.id}
					label={option.name}
					icon={option.image?.url ? undefined : <LanguageIcon />}
					onClick={() => onChange(option.id)}
					deleteIcon={<DoneIcon />}
					onDelete={value === option.id && options.length > 1 ? () => {} : undefined}
				/>)}
		</>
	)
	/*
	return (
		<Select
			value={value}
			fullWidth
			onChange={e => onChange(e.target.value as number)}
			renderValue={(selected) => (
				<span style={{ paddingLeft: '32px', position: 'relative' }}>
					<LanguageIcon sx={{ position: 'absolute', left: 0, top: -3 }} />
					{options?.find(language => language.id === selected)?.name}
				</span>

			)}
		>
			{options?.map(option => (
				<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
			))}
		</Select>
	)
	*/
}

export default LanguageSelect