import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from '../Note';

interface IAppState {
	notes: string[];
	note: string;
}

class App extends Component<{}, IAppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			note: '',
			notes: [],
		};
	}

	componentDidMount() {
		this.getNotes();
	}

	getNotes = () => {
		const savedNotes = window.localStorage.getItem('notes');
		if (savedNotes) {
			this.setState((prevState) => ({
				notes: [...prevState.notes, ...JSON.parse(savedNotes)],
			}));
		} else {
			return;
		}
	};

	handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const note = event.target.value;
		this.setState((prevState) => ({ note }));
	};

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.setState(
			(prevState) => ({
				notes: [...prevState.notes, this.state.note],
			}),
			() => {
				window.localStorage.setItem(
					'notes',
					window.JSON.stringify(this.state.notes)
				);
				this.setState({ note: '' });
			}
		);
	};
	render() {
		const { note, notes } = this.state;
		return (
			<div className="container">
				<h1 className="mt-3 mb-2 text-center">Note To Self</h1>
				<div className="text-center">
					{notes.map((note, index) => (
						<Note key={index} note={note} id={index} />
					))}
				</div>
				<div className="p-2">
					<Form
						inline
						className="d-flex justify-content-center"
						onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
							this.handleSubmit(event)
						}
					>
						<FormControl
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								this.handleOnChange(event)
							}
							value={note}
						/>
						<Button className="ml-2" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default App;
