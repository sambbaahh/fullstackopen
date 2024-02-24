import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useQuery } from "@tanstack/react-query"

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
  })

  if ( result.isLoading ) {
    return <div>un momento...</div>
  }
  if (result.isError ){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;
  console.log(result)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
