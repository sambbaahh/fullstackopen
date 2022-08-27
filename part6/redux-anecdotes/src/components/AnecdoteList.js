import { useSelector, useDispatch } from 'react-redux'
import { updateLikes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes.anecdotes)
  const dispatch = useDispatch()

  const compare = (anecdoteA, anecdoteB) => {
    if (anecdoteA.votes > anecdoteB.votes) {
      return -1
    }
    if (anecdoteA.votes < anecdoteB.votes) {
      return 1
    }
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(updateLikes(id))
  }

  return (
    <div>
      {[...anecdotes].sort(compare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList