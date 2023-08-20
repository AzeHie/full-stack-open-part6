import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const sorted = state.slice().sort((a,b) => b.votes - a.votes);
    return sorted;
  });

  const handleNewVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <Fragment>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleNewVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </Fragment>
  )
};

export default AnecdoteList;