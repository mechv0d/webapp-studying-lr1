import { useState } from 'react';
import { createPost } from '../services/api';

const CreatePostForm = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reloading

        // validation damn
        if (!title.trim() || !body.trim()) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        setIsSubmitting(true);

        try {
            // data to send
            const newPostData = {
                title: title,
                body: body,
                userId: 1, // TODO: implement users
            };

            // call func
            const createdPost = await createPost(newPostData);
            console.log('Пост создан:', createdPost);

            // callback shit
            onPostCreated(createdPost);

            // clear form
            setTitle('');
            setBody('');

        } catch (error) {
            console.error('Ошибка при создании поста:', error);
            alert('Не удалось создать пост. Проверьте консоль (если желаете)');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
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