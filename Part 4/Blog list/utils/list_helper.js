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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
