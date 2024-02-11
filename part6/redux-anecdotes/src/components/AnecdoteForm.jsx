import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (e) => {
    e.preventDefault();
    dispatch(addNewAnecdote(e.target.content.value))
    
  };

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addNew}>
      <div>
        <input name="content"/>
      </div>
      <button>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm
