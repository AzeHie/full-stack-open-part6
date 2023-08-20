import { useSelector, useDispatch } from 'react-redux';
import { addVote, newAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => {
    const sorted = state.slice().sort((a,b) => b.votes - a.votes);
    return sorted;
  });
  
  const dispatch = useDispatch();

  const handleNewVote = (id) => {
    dispatch(addVote(id));
  };

  const handleNewAnecdote = (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(newAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleNewVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
