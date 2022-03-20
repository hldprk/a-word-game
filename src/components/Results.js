import { useContext, useState } from "react";
import { Button, Modal } from "react-bulma-components";
import { Context } from "./App";
import Status from '../status';
import 'bulma/css/bulma.min.css'
import Result from "../result";

// A message showing the result of the game
export default function Results() {

	const { statuses, result } = useContext(Context);
	
	// whether 'share_button' should say 'copied' or 'share'
	let [copied, change_copied] = useState(false);

	let printed = '';

	// building a string representing the state of the game
	for(let r = 0; r < 6; r++) {

		for(const status of statuses[r]) {

			switch(status) {

				case Status.hit: printed += '🟩'; break;
				case Status.miss: printed += '⬜'; break;
				case Status.almost: printed += '🟨'; break;
				default: break;

			}

		}
		
		printed +='\r\n';

	}

	// copies 'printed' to clipboard and changes text on 'share_button'
	function on_click_share() {

		navigator.clipboard.writeText(printed)
		change_copied(true);

	}

	// refreshes page
	function on_click_refresh() {
		
		window.location.reload();

	}

	const succeeded = result === Result.success;

	const share_text = copied ? 'Copied!' : 'Share';
	const share_color = copied ? 'success' : 'info';
	const share_button = <Button id='share' color={share_color} onClick={on_click_share}>{share_text}</Button>;
	
	const fail = <span>Refresh to try again.</span>;
	const success = <span>🥳 You guessed the word correctly!</span>;
	const message = succeeded ? success : fail;
	
	const reload_button = <Button onClick={on_click_refresh}>Refresh</Button>;
	const try_again_button = <Button onClick={on_click_refresh}>Try Again</Button>;

	const button = succeeded ? share_button : reload_button;

	return (

		<Modal show={true} showClose={false}>
			<Modal.Card>
				<Modal.Card.Header showClose={false}><Modal.Card.Title>Result</Modal.Card.Title></Modal.Card.Header>
				<Modal.Card.Body>{message}</Modal.Card.Body>
				<Modal.Card.Footer>{button}{succeeded ? try_again_button : null}</Modal.Card.Footer>
			</Modal.Card>
		</Modal>

	);

}