import { useState, useEffect } from 'react';
import { getPosts } from '../services/api'; // Импортируем нашу функцию

const PostList = () => {
    // state to archive posts
    const [posts, setPosts] = useState([]);
    // state for loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const postsData = await getPosts(); 
                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
                // TODO: add error states
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts().then(() => {});
    }, []);

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
                </div>
            ))}
        </div>
    );
};

export default PostList;