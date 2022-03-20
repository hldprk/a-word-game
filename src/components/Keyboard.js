import { useContext } from 'react';
import { Button } from 'react-bulma-components'
import { Context, Event } from './App';
import Status from '../status';

// renders a "qwerty" keyboard
export function Keyboard() {

	const TOP_ROW = <Keyrow labels={['Q','W','E','R','T','Y','U','I','O','P']}/>;
	const MIDDLE_ROW = <Keyrow labels={['A','S','D','F','G','H','J','K','L']}/>;
	const BOTTOM_ROW = <Keyrow labels={['Enter','Z','X','C','V','B','N','M', 'Backspace']}/>;

	const STYLE = {
		
		justifyContent: 'center',
		margin: '0.1rem',

	};

	return (
	
		<div style={STYLE}>
			
			{TOP_ROW}
			{MIDDLE_ROW}
			{BOTTOM_ROW}

		</div>
	
	);
}

// a row of a keyboard
function Keyrow({labels}) {

	const { inputs, statuses, } = useContext(Context);

	const STYLE = {
		
		display: 'flex',
		justifyContent: 'center',
		margin: '0.1rem',

	};
	
	let keys = [];

	for(let i = 0; i < labels.length; i++) {

		let key = <Key key={i} label={labels[i]} status={Status.blank}/>

		keys.push(key);

	}

	return <div style={STYLE}>{keys}</div>;
	
}

// a button with background color corresponding to its corresponging
// 'Status' in 'statuses'
function Key({label}) {

	const { statuses, inputs, change_event} = useContext(Context);
	
	let status = Status.blank;

	for(let r = 0; r < 6; r++) {

		for(let c = 0; c < 5; c++) {

			if(inputs[r][c] === label) {

				if(statuses[r][c] === Status.miss) {

					status = Status.miss

				}

				else if(statuses[r][c] === Status.almost) {

					status = Status.almost

				}
				
				else if(statuses[r][c] === Status.hit) {

					status = Status.hit

				}

			}

		}

	}	
	
	const color =  status !== Status.blank ? 'white' : 'black';
	const border_width = status === Status.blank ? '2px' : '0px';

	const style = {

		padding: '0.60rem',
		backgroundColor: status,
		borderWidth: border_width,
		color,
		fontWeight: 'bold',
		margin: '0.1rem',
		fontFamily: 'Helvetica, Sans-Serif',
		fontSize: '1rem',

	};

	// 
	const event = new Event(label);
	
	return <Button style={style} onClick={() => change_event(event)}>{label}</Button>

}