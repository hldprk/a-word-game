import { useContext } from "react";
import { Columns } from "react-bulma-components";
import { Context } from "./App";
import Status from '../status';

export function Letter({row_index, index}) {

	let { statuses, inputs} = useContext(Context);

	const character = inputs[row_index][index];

	const status = statuses[row_index][index];

	const border_width = status === Status.blank ? '2px' : '0px';
	const color = status === Status.blank ? 'black' : 'white'
	const size = '3.3rem';

	const style = {

		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		fontWeight: 'bold',
		backgroundColor: status,
		color,
		minWidth: size,
		minHeight: size,
		maxWidth: size,
		maxHeight: size,
		borderStyle: 'solid',
		borderWidth: border_width,
		borderColor: 'lightgrey',
		fontFamily: 'Helvetica, Sans-Serif',
		fontSize: '2rem',

	};


	return (

		<Columns.Column mobile={true} marginless={true}>
			<span style={style}>{character}</span>
		</Columns.Column>

	);

}