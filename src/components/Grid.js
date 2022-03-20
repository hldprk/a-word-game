
import { Row } from './Row';
import { Columns } from 'react-bulma-components';

export function Grid() {

	let rows = [];

	for(let i = 0; i < 6; i++) {

		const row = <Row key={i} index={i}></Row>

		rows.push(row);

	}

	const style = {

		marginTop: '1rem',
		marginBottom: '1rem',
		minWidth: '300px',
		maxWidth: '300px',

	};

	return <Columns style={style} mobile={true} centered={true}>{rows}</Columns>

} 