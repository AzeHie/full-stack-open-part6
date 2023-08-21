import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const service = {
  getAll: async () => {
    const res = await axios.get(baseUrl);
    return res.data;
  },

  createNew: async (anecdote) => {
    const res = await axios.post(baseUrl, anecdote);
    return res.data;
  },

  addVote: async (newAnecdote) => {
    const res = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote);
    return res.data;
  },
};
