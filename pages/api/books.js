import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mybooks_database',
    waitForConnections: 10,
    queueLimit: 0
});

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const connection = await pool.getConnection();

            const [rows, fields] = await connection.query('SELECT * FROM books');

            connection.release();

            res.status(200).json({books: rows});
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error'});
        }           
    } else if (req.method === 'POST') {
        try {
            const {title, author } = req.body;

            const connection = await pool.getConnection();

            await connection.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author]);

            connection.release();

            res.status(200).json({ message: 'Book added successfully' });
        } catch (error) {
            console.error('Error Executing Query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;

            const connection = await pool.getConnection();

            await connection.query('DELETE FROM books WHERE id = ?', [id]);

            connection.release();

            res.status(200).json({ message: 'Book deleted successfully' })
        } catch (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}