// src/App.jsx
import { useState } from 'react';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const handlePostCreated = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setError(null);
    };

    // 3. Функция для отображения ошибок
    const showError = (errorMessage) => {
        setError(errorMessage);
        setTimeout(() => setError(null), 5000);
    };

    return (
        <div className="App">
            {/* show error if we have any */}
            {error && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '10px',
                    margin: '10px 0',
                    border: '1px solid #ef5350',
                    borderRadius: '4px'
                }}>
                    ⚠️ {error}
                </div>
            )}

            <CreatePostForm onPostCreated={handlePostCreated} onError={showError} />
            <PostList posts={posts} setPosts={setPosts} onError={showError} />
        </div>
    );
}

export default App;