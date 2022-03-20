import { Columns, } from 'react-bulma-components';
import 'bulma/css/bulma.min.css'
import { Letter } from './Letter';

/// a row of 'Grid'
export function Row({index}) {

	let letters = [];

	for(let i = 0; i < 5; i++) {
		
		const new_letter = <Letter key={i} row_index={index} index={i}/>;
	
		letters.push(new_letter);
	
	}

	return (

		<Columns marginless={true} mobile={true} breakpoint='mobile' multiline={false} centered={true}>{letters}<br/></Columns>

	); 

}