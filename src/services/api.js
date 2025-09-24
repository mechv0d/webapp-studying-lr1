import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// error interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // handling errors
        console.error('API Error:', error.response?.data || error.message);

        // TODO: add fancy logic here

        // passing error on
        return Promise.reject(error);
    }
);

export default apiClient;

export const getPosts = async () => {
    const response = await apiClient.get('/posts');
    return response.data;
};

export const createPost = async (postData) => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
};

// put request
export const updatePost = async (postId, postData) => {
    const response = await apiClient.put(`/posts/${postId}`, postData);
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
};