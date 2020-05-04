const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'Test Blog',
		author: 'Sir Test',
		url: 'https://www.lifeofsirtest.com',
		likes: 42,
		user: '5ea32b09e74d94ddc033e8fb',
	},
	{
		title: 'Compuglobal Hypermeganet',
		author: 'Homer J. Simpson',
		url: 'https://www.homersimpson.com',
		likes: 123,
		user: '5ea32b09e74d94ddc033e8fc',
	},
	{
		title: 'Defend Sparta!',
		author: 'King Leonidas',
		url: 'https://www.300.com',
		likes: 300,
		user: '5ea32b09e74d94ddc033e8fd',
	},
];

const initialUsers = [
	{ username: 'Sir Test', password: 'mrtest' },
	{ username: 'Homer J. Simpson', password: 'donuts' },
	{ username: 'King Leonidas', password: 'Sparta300' },
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb };
