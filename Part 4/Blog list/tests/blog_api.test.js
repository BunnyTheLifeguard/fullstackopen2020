const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

test('Blogs returned as JSON', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('Correct number of blogs returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('Verify id property name', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body[0].id).toBeDefined();
});

test('Verify POST request', async () => {
	const testBlog = {
		title: 'Test Test',
		author: 'Mr Test',
		url: 'https://www.testoftest.com',
		likes: 24,
	};

	await api
		.post('/api/blogs')
		.send(testBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const content = blogsAtEnd.map((blog) => blog.title);
	expect(content).toContain('Test Test');
});

test('No likes equals zero', async () => {
	const testBlog = {
		title: 'Test Test Test',
		author: 'Mrs Test',
		url: 'https://www.testoftesttest.com',
	};

	await api
		.post('/api/blogs')
		.send(testBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	const recentLikes = blogsAtEnd[helper.initialBlogs.length].likes;
	expect(recentLikes).toBe(0);
});

test('No title & author => 400', async () => {
	const testBlog = {
		url: 'https://www.testoftest.com',
		likes: 24,
	};

	await api.post('/api/blogs').send(testBlog).expect(400);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('Delete a blog', async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToDelete = blogsAtStart[0];

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

	const blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

	const titles = blogsAtEnd.map((b) => b.title);
	expect(titles).not.toContain(blogToDelete.title);
});

test('Update likes via id', async () => {
	const blogs = await helper.blogsInDb();
	const updatedLikes = {
		likes: 42,
	};

	await api.put(`/api/blogs/${blogs[1].id}`).send(updatedLikes).expect(200);

	expect(blogs).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
	mongoose.connection.close();
});
