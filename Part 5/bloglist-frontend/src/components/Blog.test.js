import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('Check render only blog title & author', () => {
	const blog = {
		title: 'testblog',
		author: 'mrtest',
		url: 'www.test.te',
		likes: 42,
	};

	const component = render(<Blog blog={blog} />);

	const hidden = component.container.querySelector('.hideDetails');
	expect(hidden).toHaveTextContent('testblog');
	expect(hidden).toHaveTextContent('mrtest');
	expect(hidden).not.toHaveTextContent('www.test.te');
	expect(hidden).not.toHaveValue(42);
});
