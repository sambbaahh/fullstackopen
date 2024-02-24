import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import { useNotificationDispatch } from "../hooks/NotificationContext";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote with content: ' + content)
    const newAnecdote = {
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0,
    }
    newAnecdoteMutation.mutate(newAnecdote);
    notificationDispatch({
      type: "SET",
      payload: `new anecdote: "${content}"`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' minLength={5}/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
