import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';

// receiving posts and setPosts from App.jsx
const PostList = ({ posts, setPosts }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (posts.length === 0) {
            fetchPosts().then(() => {});
        } else {
            setIsLoading(false);
        }
    }, [setPosts, posts.length]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Список постов</h1>
            {posts.map((post) => (
                <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {/* TODO: edit and delete buttons here */}
                </div>
            ))}
        </div>
    );
};

export default PostList;