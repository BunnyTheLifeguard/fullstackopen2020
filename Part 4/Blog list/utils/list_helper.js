const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const sum =
		blogs.length === 1
			? blogs[0].likes
			: blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
	return sum;
};

const favoriteBlog = (blogs) => {
	const max =
		blogs[
			blogs
				.map((blog) => blog.likes)
				.indexOf(Math.max(...blogs.map((blog) => blog.likes)))
		];
	const { __v, _id, url, ...rest } = max;
	return rest;
};

const mostBlogs = (blogs) => {
	const most = _.countBy(blogs, (blog) => blog.author);
	const max = _.max(Object.entries(most));
	return { author: max[0], blogs: max[1] };
};

const mostLikes = (blogs) => {
	const most = _(blogs)
		.groupBy('author')
		.map((prop, key) => {
			return { author: key, likes: _.sumBy(prop, 'likes') };
		})
		.value();
	const max = _.maxBy(most, 'likes');
	return max;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
