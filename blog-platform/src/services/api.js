import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: API_URL,

});

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

export const getBlogs = () => api.get('/blogs');
export const createBlog = (data, token) => api.post('/blogs', data, { headers: { Authorization: token } });
export const updateBlog = (id, data, token) => api.put(`/blogs/${id}`, data, {
    headers: {
        Authorization: token
    }
});
export const deleteBlog = (id, token) => api.delete(`/blog/${id}`, { headers: { Authorization: token } });

export default api;