import axios from 'axios';

// axios object
const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // base url
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPosts = async () => {
    const response = await apiClient.get('/posts');
    return response.data;
};

export default apiClient;