import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const getOne = async (id) => {
	const idUrl = `${baseUrl}/${id}`;
	const response = await axios.get(idUrl);
	return response.data;
};

export default { getAll, getOne };
