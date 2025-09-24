// src/services/api.js
import axios from 'axios';

// Создаем экземпляр axios с предварительной настройкой
const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Базовый URL для всех запросов
    headers: {
        'Content-Type': 'application/json', // Указываем, что мы отправляем/получаем JSON
    },
});

export default apiClient;