import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import EditPostForm from './EditPostForm';

const PostList = ({ posts, setPosts }) => {
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

    // region Edit Func

    const handleEditClick = (postId) => {
        setEditingPostId(postId);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    const handlePostUpdated = (updatedPost) => {
        // update in local state
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        );
        // exit editing mode
        setEditingPostId(null);
    };

    // endregion

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
                        />
                    ) : (
                        <>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <button onClick={() => handleEditClick(post.id)}>
                                Редактировать
                            </button>
                            {/* TODO: add delete button */}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;