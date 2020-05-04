import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
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

export default { getAll, create, update, remove, setToken };
