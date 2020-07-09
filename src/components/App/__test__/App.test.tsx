import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App, { IAppState } from '../App';

describe('App component', () => {
	const component = mount<App, {}, IAppState>(<App />);
	const note = 'sample note';
	it('should render App component', () => {
		expect(component).toMatchSnapshot();
	});
	it('should initialize the `state` with an empty `notes`', () => {
		expect(component.state().notes).toEqual([]);
	});
	it('should initialize the `state` with an empty `note`', () => {
		expect(component.state().note).toEqual('');
	});
	it('should initialize the `state` with an empty `note`', () => {
		expect(component.state().selectedNoteId).toEqual('');
	});
	it('should have an h1 with text `Note To Self', () => {
		expect(component.find('h1').text()).toEqual('Note To Self');
	});

	describe('If value of input is changed', () => {
		beforeEach(() => {
			component
				.find('FormControl')
				.simulate('change', { target: { value: note } });
		});

		it('should update `note` value in `state`', () => {
			expect(component.state().note).toEqual(note);
		});
		describe('If `Submit` button is clicked', () => {
			beforeEach(() => {
				component.find('Form').simulate('submit');
			});

			afterEach(() => {
				component.find('Button').at(1).simulate('click');
			});
			it('should add value of `note` in the `state` to `notes`', () => {
				expect(component.state().notes[0]).toEqual(note);
			});
			describe('App is re-mounting', () => {
				let remountComponent: ReactWrapper<{}, IAppState, App>;
				beforeEach(() => {
					remountComponent = mount(<App />);
				});
				it('should read notes from `notes` in the `localStorage`', () => {
					expect(remountComponent.state().notes).toEqual([note]);
				});
			});
		});
	});
	describe('When `Clear Notes` is clicked', () => {
		beforeEach(() => {
			component.setState({ notes: [note] });
			// component.instance().clearNotes();
			component.find('Button').at(1).simulate('click');
		});
		it('should remove all notes from `notes` in `state', () => {
			expect(component.state().notes).toEqual([]);
		});
	});
	describe('If Delete icon is clicked', () => {
		component.setState({ notes: [note] });
		component.find('.delete').at(0).simulate('click');
		it('should remove a `note` from `notes`', () => {
			expect(component.state().notes).toEqual([]);
		});
	});
});
