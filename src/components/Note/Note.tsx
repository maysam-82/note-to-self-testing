import React from 'react';
import './note.css';

interface INote {
	note: string;
	id: number;
	handleDeleteNote: (id: number) => void;
	handleEditNote: (id: number) => void;
}

const Note: React.SFC<INote> = ({
	note,
	id,
	handleDeleteNote,
	handleEditNote,
}) => {
	return (
		<div className="d-flex border rounded align-items-center mt-1">
			<div className="  p-2 text-left note">{note}</div>
			<div className="edit pt-2 pb-2" onClick={() => handleEditNote(id)}>
				&#9997;
			</div>
			<div className="delete pt-2 pb-2" onClick={() => handleDeleteNote(id)}>
				&#10006;
			</div>
		</div>
	);
};

export default Note;
