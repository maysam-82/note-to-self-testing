import React from 'react';

interface INote {
	note: string;
	id: number;
}

const Note: React.SFC<INote> = ({ note, id }) => {
	return <div className="mt-1 border rounded p-2 text-left">{note}</div>;
};

export default Note;
