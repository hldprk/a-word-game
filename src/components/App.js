import { Container } from 'react-bulma-components';
import 'bulma/css/bulma.min.css'
import { Grid } from './Grid';
import { useState, useEffect, useReducer, useLayoutEffect, createContext } from 'react';
import { Keyboard } from './Keyboard';
import words from '../words.json'
import Status from '../status';
import Results from './Results';
import Result from '../result';

/// simple-to-construct event class
export class Event {

	constructor(key) {

		this.key = key;
		this.time = Date.now();

	}

}

const word_index = Math.floor(Math.random() * words.length);

const word = words[word_index].toUpperCase();

const default_inputs = [
	
	'',
	'',
	'',
	'',
	'',
	'',
	
];

const default_statuses = [
	
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],
	[Status.blank, Status.blank, Status.blank, Status.blank, Status.blank, Status.blank],

];

export let Context = createContext(null);

console.log('word is ' + word)

export function App() {

	let [row_index, change_row_index] = useState(0);

	// an array of strings holding the characters the user input (string[])
	let [inputs, change_inputs] = useState(default_inputs);

	// Status[][]
	let [statuses, change_statuses] = useState(default_statuses);

	// is Result.in_progress until the word is guessed or user has guessed 6 times
	let [result, change_result] = useState(Result.in_progress);
	
	// the last key the user input
	let [event, change_event] = useState(null);
	
	// forces App to rerender
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	
	// checks if key corresponds to a letter key
	const is_letter = (key) => /^[a-zA-Z]$/.test(key);

	// updates 'event' every time a key is pressed
	useEffect(() => {

		window.addEventListener('keydown', (event) => {

			change_event(new Event(event.key));
			
		});
	
	}, []);


	function handle_event_change() {
		
		if(!event) { return; }

		const key = event.key;
		const input = inputs[row_index];

		// if backspace is pressed, shorten 'inputs[row_index]' by 1
		if(key === 'Backspace' && input.length !== 0) {

			inputs[row_index] = input.substring(0, input.length - 1);

			change_inputs(inputs);

			forceUpdate();
			
		}

		// if enter is pressed ...
		else if(key === 'Enter' && input.length === 5 && row_index < 7) {

			// updates 'statuses' to reflect whether each character matches 'word'
			for(let i = 0; i < 5; i++) {

				if(word.includes(input[i])) {
				
					if(word[i] === input[i]) {
	
						statuses[row_index][i] = Status.hit;
	
					}
	
					else {
	
						statuses[row_index][i] = Status.almost;
	
					}
					
				}
				
				else {
					
					statuses[row_index][i] = Status.miss;
					
				}
	
			}

			change_statuses(statuses);
			
			forceUpdate();

			// user guessed the word - show 'Results'
			if(inputs[row_index] === word) {

				change_result(Result.success);

			}

			// user ran out of guesses - show 'Results'
			else if(row_index === 5) {

				change_result(Result.fail);

			}

			// otherwise move down to the next row
			else {
				
				change_row_index(row_index + 1);

			}

			forceUpdate();
						
		}

		// if letter key is pressed ...
		else if(input.length < 5 && row_index <= 6 && is_letter(key)) {
			
			const new_input = input + key.toUpperCase();

			inputs[row_index] = new_input;

			change_inputs(inputs);
			
			forceUpdate();

		}
		
	}

	useEffect(handle_event_change, [event]);

	const style = {

		display: 'flex',
		justifyContent: 'center',

	};

	let value = {

		word,
		row_index,
		inputs,
		change_event,
		statuses,
		result

	}

	const container_style = {

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

	};

	// if the game is finished, show 'Results'
	const results = result === Result.in_progress ? <span/> : <Results/>

	return (

		<Context.Provider value={value} style={style}>
			
			<Container style={container_style}>
				<Grid/>	
			</Container>

			<Container style={container_style}>
				<Keyboard/>
			</Container>

			{results}
			
		</Context.Provider>

	);

}
