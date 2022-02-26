import { DatoLanguage } from "../../types"
import LanguageIcon from '@mui/icons-material/Language'
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

const LanguageSelect = (props: {
	options?: DatoLanguage[]
	value: number | null
	onChange: (language: number | null) => void
}) => {
	return (
		<Select
			value={props.value}
			fullWidth
			onChange={e => props.onChange(e.target.value as number)}
			renderValue={(selected) => (
				<span style={{ paddingLeft: '32px', position: 'relative' }}>
					<LanguageIcon sx={{ position: 'absolute', left: 0, top: -3 }} />
					{props.options?.find(language => language.id === selected)?.name}
				</span>

			)}
		>
			{props.options?.map(option => (
				<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
			))}
		</Select>
	)
}

export default LanguageSelect