const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',       // Replace with your DB host
    user: 'root',            // Replace with your MySQL username
    password: '',    // Replace with your MySQL password
    database: 'wings_cafe'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import express, mysql2, cors, body-parser as before

// Add CRUD Routes

// Get all products
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Add a new product
app.post('/products', (req, res) => {
    const { name, description, price, quantity } = req.body;
    const query = 'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity], (err, results) => {
        if (err) res.status(500).send(err);
        else res.json({ id: results.insertId, ...req.body });
    });
});

// Update a product
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(query, [name, description, price, quantity, id], (err) => {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});
