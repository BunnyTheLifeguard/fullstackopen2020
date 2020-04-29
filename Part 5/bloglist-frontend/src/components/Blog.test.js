import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('Check render only blog title & author', () => {
	const blog = {
		title: 'testblog',
		author: 'mrtest',
		url: 'www.test.te',
		likes: 42,
	};

	const component = render(<Blog blog={blog} />);

	// component.debug();

	const hidden = component.container.querySelector('.hideDetails');
	expect(hidden).toHaveTextContent('testblog');
	expect(hidden).toHaveTextContent('mrtest');
	expect(hidden).not.toHaveTextContent('www.test.te');
	expect(hidden).not.toHaveValue(42);
});

test('Clicking the "View" button shows details', () => {
	const blog = {
		title: 'testblog',
		author: 'mrtest',
		url: 'www.test.te',
		likes: 42,
	};

	const mockHandler = jest.fn();

	const component = render(<Blog blog={blog} toggleDetails={mockHandler} />);

	// component.debug();

	const button = component.getByText('View');
	fireEvent.click(button);

	const withDetails = component.container.querySelector('.showDetails');

	expect(withDetails).toHaveTextContent('www.test.te');
	expect(withDetails).toHaveTextContent('42');
});
