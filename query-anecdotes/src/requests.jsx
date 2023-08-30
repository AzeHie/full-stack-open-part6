import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) => {
  // simulate validation error, because backend not doing that:
  if (newAnecdote.content.length < 5) {
    throw new Error('Anecdote content is too short');
  }
  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
}

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
