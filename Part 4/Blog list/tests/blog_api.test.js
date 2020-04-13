const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
	{
		title: 'Test Blog',
		author: 'Sir Test',
		url: 'https://www.lifeofsirtest.com',
		likes: 42,
	},
	{
		title: 'Compuglobal Hypermeganet',
		author: 'Homer J. Simpson',
		url: 'https://www.homersimpson.com',
		likes: 123,
	},
	{
		title: 'Defend Sparta!',
		author: 'King Leonidas',
		url: 'https://www.300.com',
		likes: 300,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[2]);
	await blogObject.save();
});

describe('API tests', () => {
	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('Number of blogs in DB', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(3);
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
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');
		const contents = response.body.map((r) => r.title);

		expect(response.body).toHaveLength(initialBlogs.length + 1);
		expect(contents).toContain('Test Test');
	});
});

afterAll(() => {
	mongoose.connection.close();
});
