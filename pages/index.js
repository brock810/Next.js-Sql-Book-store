import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch('/api/books')
    .then(response => response.json())
    .then(data => {
      setBooks(data.books);
      setLoading(false);
    })
    .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

const handleDelete = async (id) => {
  try {
    await fetch(`/api/books?id=${id}`, { method: 'DELETE'});

    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};

return (
  <div>
    <h1>Books</h1>
    <Link href = "/add-book">
      Add Book
    </Link>
    {loading ? (
      <p>Loading...</p>
    ) : (
      books && books.length > 0 ? (
        <ul> 
          {books.map(book => (
            <li key={book.id}>
              {book.title} by {book.author}
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Books Found</p>
      )
    )}
  </div>
)
}
