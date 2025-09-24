// src/App.jsx
import { useState } from 'react';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';
import './App.css';

function App() {
    // POSTS ONLY HERE!!!
    const [posts, setPosts] = useState([]);

    const handlePostCreated = (newPost) => {
        // JSONPlaceholder doesn't save real data, but returns an object with ID.
        // we will add new post at the beginning of our posts
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <div className="App">

            <CreatePostForm onPostCreated={handlePostCreated} />

            <PostList posts={posts} setPosts={setPosts} />
        </div>
    );
}

export default App;