import { useState, useEffect } from 'react';
import { updatePost } from '../services/api';

const EditPostForm = ({ post, onPostUpdated, onCancel, onError }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setTitle(post.title);
        setBody(post.body);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) {
            onError('Пожалуйста, заполните все поля.');
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedPostData = {
                title: title,
                body: body,
                userId: post.userId,
            };

            const updatedPost = await updatePost(post.id, updatedPostData);
            console.log('Пост обновлен:', updatedPost);
            onPostUpdated(updatedPost);

        } catch (error) {
            console.error('Ошибка при обновлении поста:', error);
            onError('Не удалось обновить пост. Проверьте консоль (если желаете)');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '15px', margin: '10px 0' }}>
            <h3>Редактирование поста #{post.id}</h3>
            <div>
                <label htmlFor={`edit-title-${post.id}`}>Заголовок: </label>
                <br />
                <input
                    type="text"
                    id={`edit-title-${post.id}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor={`edit-body-${post.id}`}>Текст: </label>
                <br />
                <textarea
                    id={`edit-body-${post.id}`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Обновление...' : 'Обновить пост'}
            </button>
            <button type="button" onClick={onCancel} disabled={isSubmitting} style={{ marginLeft: '10px' }}>
                Отмена
            </button>
        </form>
    );
};

export default EditPostForm;