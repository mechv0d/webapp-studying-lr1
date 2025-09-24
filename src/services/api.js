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

export const createPost = async (postData) => {
    const response = await apiClient.post('/posts', postData); // POST-запрос на /posts
    return response.data; // JSONPlaceholder вернет объект с новым постом, включая сгенерированный ID
};

export default apiClient;