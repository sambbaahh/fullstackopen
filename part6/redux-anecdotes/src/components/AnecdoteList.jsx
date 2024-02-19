import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        state.filter.length > 0
          ? anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          : true
      )
      .sort((a, b) => a.votes < b.votes)
  );

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
