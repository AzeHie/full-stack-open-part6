import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const sorted = state.anecdotes.slice().sort((a,b) => b.votes - a.votes);

    if (state.filter === 'ALL') {
      return sorted;
    }
    return sorted.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()));
  });

  const handleNewVote = (anecdote) => {
    dispatch(newVote(anecdote.id));
    dispatch(setNotification(`You voted ${anecdote.content}`, 5));
  };

  return (
    <Fragment>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleNewVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </Fragment>
  )
};

export default AnecdoteList;