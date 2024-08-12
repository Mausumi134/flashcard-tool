// src/Flashcard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Flashcard.css';

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flashcards');
        if (Array.isArray(response.data)) {
          setFlashcards(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch flashcards:', err);
        setError('Failed to fetch flashcards');
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (flashcards.length === 0) return <div>No flashcards available</div>;

  const { question, answer } = flashcards[currentIndex];

  return (
    <div className="page-container">
      <header className="header">
        <h1>Flashcard App</h1>
      </header>
      <div className="flashcard-container">
        <div className="flashcard" onClick={() => setFlipped(!flipped)}>
          <div className={`card ${flipped ? 'flipped' : ''}`}>
            <div className="front">{question}</div>
            <div className="back">{answer}</div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={prevFlashcard}>Previous</button>
          <button onClick={nextFlashcard}>Next</button>
        </div>
        <div className="nav-buttons">
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
