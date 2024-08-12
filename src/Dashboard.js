// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        setFlashcards(response.data);
      } catch (err) {
        setError('Failed to fetch flashcards');
      }
    };

    fetchFlashcards();
  }, []);

  const handleAddFlashcard = async () => {
    if (!question || !answer) {
      setError('Both question and answer are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/flashcards', {
        question,
        answer,
      });
      setFlashcards([...flashcards, response.data]);
      setQuestion('');
      setAnswer('');
    } catch (err) {
      setError('Failed to add flashcard');
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (err) {
      setError('Failed to delete flashcard');
    }
  };

  return (
    <div className="dashboard">
      <h2>Flashcard Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <div className="add-flashcard">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>
      <div className="flashcard-list">
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="flashcard-item">
            <div className="flashcard-item-content">
              <strong>{flashcard.question}</strong>: {flashcard.answer}
            </div>
            <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Back to Flashcards</button>
      </div>
    </div>
  );
};

export default Dashboard;
