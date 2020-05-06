import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (updatedObject) => {
	const idUrl = `/api/blogs/${updatedObject.id}`;
	const response = await axios.put(idUrl, updatedObject);
	return response.data;
};

const remove = async (objectToRemove) => {
	const config = {
		headers: { Authorization: token },
	};
	const idUrl = `/api/blogs/${objectToRemove.id}`;
	const response = await axios.delete(idUrl, config);
	return response.data;
};

const getComments = async (blogId) => {
	const response = await axios.get(`${baseUrl}/${blogId}/comments`);
	return response.data;
};

const createComment = async (commentObject) => {
	const { blogId } = commentObject;
	const comment = { comment: commentObject.comment };
	const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment);
	return response.data;
};

export default {
	getAll,
	create,
	update,
	remove,
	setToken,
	getComments,
	createComment,
};
