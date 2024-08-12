import axios from 'axios';

const apiUrl = 'https://flashcard-tool-1e9b.onrender.com';

export const getFlashcards = async () => {
  const response = await axios.get(`${apiUrl}/flashcards`);
  return response.data;
};
