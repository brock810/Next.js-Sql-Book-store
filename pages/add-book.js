import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddBook() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch('api/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        });
        router.push('/');
    };

    return ( 
        <div>
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
            <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            />
            <button type="submit">Add Book</button>
        </form>
        </div>
    );
}