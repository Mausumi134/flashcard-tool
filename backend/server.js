const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(cors()); // Ensure this line is present

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flashcard_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

// Routes
// backend/server.js
app.get('/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query error' });
        return;
      }
      console.log('Flashcards:', results); // Log results
      res.json(results);
    });
  });
  
  
  
  

app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, question, answer });
  });
});

app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
