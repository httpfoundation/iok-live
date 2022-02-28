import { Link } from "react-router-dom"
import { useStages } from "../../Store"

const Home = () => {

	const stages = useStages()

	return (
		<>
			<h1>Aula</h1>

			<Link to="/recepcio"><h1>Recepció</h1></Link>
			<Link to="/itmp-klub-cafe"><h1>ITMP Klub Cafe</h1></Link>
			<h2>Szekciók</h2>
			{stages?.map(stage => (
				<Link key={stage.id} to={`/szekcio/${stage.slug}`}>
					<h2>{stage.name}</h2>
				</Link>
			))}
		</>
	)
}

export default Home