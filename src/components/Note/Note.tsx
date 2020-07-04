import React from 'react';

interface INote {
	note: string;
	id: number;
}

const Note: React.SFC<INote> = ({ note, id }) => {
	return <div className="mt-1">{note}</div>;
};

export default Note;
