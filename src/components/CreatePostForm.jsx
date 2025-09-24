import { useState } from 'react';
import { createPost } from '../services/api';

const CreatePostForm = ({ onPostCreated, onError }) => { // props onError
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) {
            onError('Пожалуйста, заполните все поля.'); // using onError instead of alert
            return;
        }

        setIsSubmitting(true);

        try {
            const newPostData = {
                title: title,
                body: body,
                userId: 1,
            };

            const createdPost = await createPost(newPostData);
            console.log('Пост создан:', createdPost);

            onPostCreated(createdPost);
            setTitle('');
            setBody('');

        } catch (error) {
            console.error('Ошибка при создании поста:', error);
            onError('Не удалось создать пост. Проверьте консоль для деталей.'); // using onError
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Создать новый пост</h2>
            <div>
                <label htmlFor="title">Заголовок: </label>
                <br />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="body">Текст: </label>
                <br />
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Создание...' : 'Создать пост'}
            </button>
        </form>
    );
};

export default CreatePostForm;