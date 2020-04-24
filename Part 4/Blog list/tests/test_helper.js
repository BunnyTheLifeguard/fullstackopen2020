const Blog = require('../models/blog');
const User = require('../models/user');

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

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
