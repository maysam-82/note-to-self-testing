import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from '../Note';
import {
	saveItemToLocalStorage,
	getItemFromLocalStorage,
	removeItemFromLocalStorage,
} from '../../Utilities/storage';
import './app.css';
export interface IAppState {
	notes: string[];
	note: string;
	selectedNoteId: string;
}

class App extends Component<{}, IAppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			note: '',
			notes: [],
			selectedNoteId: '',
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
		const { note, selectedNoteId } = this.state;
		if (note) {
			if (selectedNoteId) {
				const noteId = parseInt(selectedNoteId);
				const clonedNotes = [...this.state.notes];
				clonedNotes[noteId] = this.state.note;
				this.setState({ notes: clonedNotes, selectedNoteId: '' }, () =>
					this.saveNote()
				);
			} else {
				this.setState(
					(prevState) => ({
						notes: [...prevState.notes, this.state.note],
					}),
					() => this.saveNote()
				);
			}
		}
	};
	saveNote = () => {
		saveItemToLocalStorage<string[]>('notes', this.state.notes);
		this.setState({ note: '' });
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
	handleEditNote = (noteId: number) => {
		const selectedNote = this.state.notes.find((_, index) => index === noteId);
		if (selectedNote) {
			this.setState({ note: selectedNote, selectedNoteId: noteId.toString() });
		}
	};
	renderNotes = () => {
		return this.state.notes.map((note, index) => (
			<Note
				key={index}
				note={note}
				id={index}
				handleDeleteNote={this.handleDeleteNote}
				handleEditNote={this.handleEditNote}
			/>
		));
	};
	render() {
		const { note, notes, selectedNoteId } = this.state;
		return (
			<div className="container">
				<h1 className="mt-3 mb-2 text-center">Note To Self</h1>
				<div className="text-center">{this.renderNotes()}</div>
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
							{!selectedNoteId ? 'Submit' : 'Edit'}
						</Button>
					</Form>
					<div className="pb-2 pt-2 d-flex justify-content-center button-clear-notes">
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
