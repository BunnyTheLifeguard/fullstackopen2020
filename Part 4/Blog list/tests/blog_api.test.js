const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

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
});

afterAll(() => {
	mongoose.connection.close();
});
