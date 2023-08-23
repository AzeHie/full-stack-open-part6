import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = {
      content: content,
      votes: 0,
    };
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`New anecdote added: ${content}`, 5));
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
