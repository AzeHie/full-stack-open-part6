import { createSlice } from '@reduxjs/toolkit';
import { service } from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const modifiedAnecdote = action.payload;
      return state.map((a) => (a.id !== modifiedAnecdote.id ? a : modifiedAnecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await service.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await service.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const newVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes;
    const anecdoteToEdit = state.find((a) => a.id === id);

    if (anecdoteToEdit) {
      const modifiedAnecdote = {
        ...anecdoteToEdit,
        votes: anecdoteToEdit.votes + 1,
      };
      await service.addVote(modifiedAnecdote);
      dispatch(addVote(modifiedAnecdote));
    }
  };
};
export default anecdoteSlice.reducer;
