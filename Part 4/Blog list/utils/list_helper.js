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

module.exports = {
	dummy,
	totalLikes,
};
