import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./hooks/NotificationContext";
import anecdotesService from "./services/anecdotes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updatedAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notificationDispatch({
        type: "SET",
        payload: `anecdote "${updatedAnecdote.content}" voted`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote: " + anecdote.content);
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
  });

  if (result.isLoading) {
    return <div>un momento...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;
  console.log(result);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
