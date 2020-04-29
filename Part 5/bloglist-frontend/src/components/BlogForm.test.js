import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('Check if blogform receives right details', () => {
	const createBlog = jest.fn();

	const component = render(<BlogForm createBlog={createBlog} />);

	const title = component.container.querySelector('#title');
	const author = component.container.querySelector('#author');
	const url = component.container.querySelector('#url');
	const form = component.container.querySelector('form');

	fireEvent.change(title, { target: { value: 'Test Title' } });
	fireEvent.change(author, { target: { value: 'Mr Test' } });
	fireEvent.change(url, { target: { value: 'www.test.te' } });
	fireEvent.submit(form);

	expect(createBlog.mock.calls[0][0].title).toBe('Test Title');
});
