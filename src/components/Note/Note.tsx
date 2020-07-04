import React from 'react';
import './note.css';

interface INote {
	note: string;
	id: number;
	handleDeleteNote: (id: number) => void;
}

const Note: React.SFC<INote> = ({ note, id, handleDeleteNote }) => {
	return (
		<div
			className="d-flex border rounded align-items-center mt-1"
			onClick={() => handleDeleteNote(id)}
		>
			<div className="  p-2 text-left note">{note}</div>
			<div className="delete pt-2 pb-2">&#10006;</div>
		</div>
	);
};

export default Note;
