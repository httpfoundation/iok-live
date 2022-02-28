import { Link as ReactRouterLink } from "react-router-dom"
import { useStages } from "../../Store"
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import Link from '../../components/Link'

const Home = () => {

	const stages = useStages()

	return (
		<>
		<Typography variant="h2">Aula</Typography>
		<Typography variant="h4">
			<Link to="/recepcio" underline="none">Recepció</Link>
		</Typography>
		<Typography variant="h4">
			<Link to="/itmp-klub-cafe" underline="none">ITMP Klub Cafe</Link>
		</Typography>
		<Typography variant="h4"><Link to="#" underline="none">Szekciók</Link></Typography>
			<ul>
				{stages?.map(stage => (
					<li key={stage.id} >
						<Link component={ReactRouterLink} to={`/szekcio/${stage.slug}`} underline="none">
							<Typography variant="h5"> {stage.name}</Typography>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default Home