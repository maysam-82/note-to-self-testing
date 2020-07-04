import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

import Note from '../Note';

const App: React.SFC = () => {
	const [note, setNote] = useState('');
	const [notes, setNotes] = useState<string[]>([]);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const note = event.target.value;
		setNote(note);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNotes([...notes, note]);
		setNote('');
	};

	return (
		<div className="container">
			<h1 className="mt-3 mb-2 text-center">Note To Self</h1>
			<div className="text-center">
				{notes.map((note, index) => (
					<Note note={note} id={index} />
				))}
			</div>
			<div className="p-2">
				<Form
					inline
					className="d-flex justify-content-center"
					onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
						handleSubmit(event)
					}
				>
					<FormControl
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleOnChange(event)
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
};

export default App;
