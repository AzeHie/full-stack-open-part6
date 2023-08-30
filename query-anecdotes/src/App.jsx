import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      notificationDispatch({ type: 'SHOW', payload: 'New anecdote added' });
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' });
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      notificationDispatch({
        type: 'SHOW',
        payload: 'Too short anecdote, has to be atleast 5 characters',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' });
      }, 5000);
    },
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (context) => {
      const anecdote = context.content;

      notificationDispatch({
        type: 'SHOW',
        payload: `You voted ${anecdote}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' });
      }, 5000);

      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      { context: { anecdote } }
    );
  };

  const handleAddAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <div>anecdote service not avaible due to problems in the server</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm handleAddAnecdote={handleAddAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
