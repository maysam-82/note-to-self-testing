import React from 'react';
import { shallow } from 'enzyme';
import Note from '../Note';

describe('Note Component', () => {
	const mockDelete = jest.fn();
	const mockEdit = jest.fn();
	const props = {
		note: 'test note',
		id: 100,
		handleDeleteNote: mockDelete,
		handleEditNote: mockEdit,
	};
	const component = shallow(<Note {...props} />);
	it('should render Note component', () => {
		expect(component).toMatchSnapshot();
	});
	it('should render `test note`', () => {
		expect(component.find('.note').text()).toEqual(props.note);
	});
	describe('when click on delete icon', () => {
		component.find('.delete').simulate('click');
		it('should call handleDeleteNote', () => {
			expect(mockDelete).toHaveBeenCalledWith(props.id);
		});
	});
	describe('when click on edit icon', () => {
		component.find('.edit').simulate('click');
		it('should call handleEditNote', () => {
			expect(mockEdit).toHaveBeenCalledWith(props.id);
		});
	});
});
