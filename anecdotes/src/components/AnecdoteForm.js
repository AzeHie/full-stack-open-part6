import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(newAnecdote(content));
  };

  return (
    <Fragment>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </Fragment>
  );
};

export default AnecdoteForm;