import { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/api';
import EditPostForm from './EditPostForm';

const PostList = ({ posts, setPosts, onError }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [editingPostId, setEditingPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
                onError('Не удалось загрузить посты. Проверьте консоль (если желаете)');
            } finally {
                setIsLoading(false);
            }
        };

        if (posts.length === 0) {
            fetchPosts().then(() => {});
        } else {
            setIsLoading(false);
        }
    }, [setPosts, posts.length, onError]);

    const handleEditClick = (postId) => {
        setEditingPostId(postId);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    const handlePostUpdated = (updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
        setEditingPostId(null);
    };

    const handleDeleteClick = async (postId) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) {
            return;
        }

        try {
            await deletePost(postId);
            console.log('Пост удален:', postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
            onError('Не удалось удалить пост. Проверьте консоль (если желаете)');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Список постов</h1>
            {posts.map((post) => (
                <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    {editingPostId === post.id ? (
                        <EditPostForm
                            post={post}
                            onPostUpdated={handlePostUpdated}
                            onCancel={handleCancelEdit}
                            onError={onError}
                        />
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <div>
                                <button onClick={() => handleEditClick(post.id)}>
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(post.id)}
                                    style={{ marginLeft: '10px', backgroundColor: '#ff6b6b', color: 'white' }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;