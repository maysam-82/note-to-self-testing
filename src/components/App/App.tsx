import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from '../Note';
import {
	saveItemToLocalStorage,
	getItemFromLocalStorage,
	removeItemFromLocalStorage,
} from '../../Utilities/storage';
import './app.css';
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
		const savedNotes = getItemFromLocalStorage<string[]>('notes');
		if (savedNotes) {
			this.setState((prevState) => ({
				notes: [...prevState.notes, ...savedNotes],
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
		const { note } = this.state;
		if (note) {
			this.setState(
				(prevState) => ({
					notes: [...prevState.notes, this.state.note],
				}),
				() => {
					saveItemToLocalStorage<string[]>('notes', this.state.notes);
					this.setState({ note: '' });
				}
			);
		}
	};
	handleDeleteNote = (noteId: number) => {
		const filteredNotes = this.state.notes.filter(
			(_, index) => index !== noteId
		);
		this.setState(
			{
				notes: filteredNotes,
			},
			() => {
				removeItemFromLocalStorage('notes');
				saveItemToLocalStorage<string[]>('notes', this.state.notes);
			}
		);
	};
	clearNotes = () => {
		this.setState(
			{
				notes: [],
			},
			() => {
				removeItemFromLocalStorage('notes');
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
						<Note
							key={index}
							note={note}
							id={index}
							handleDeleteNote={this.handleDeleteNote}
						/>
					))}
				</div>
				<div
					className={`pt-2 pb-2 mt-2 ${notes.length > 0 ? 'border-top' : ''}`}
				>
					<Form
						className="d-flex justify-content-between"
						onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
							this.handleSubmit(event)
						}
					>
						<FormControl
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								this.handleOnChange(event)
							}
							value={note}
							className="form-control-input"
						/>
						<Button className="button-submit" type="submit">
							Submit
						</Button>
					</Form>
					<div className="pb-2 pt-2 d-flex justify-content-center">
						<Button onClick={this.clearNotes} variant="danger" block>
							Clear Notes
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
