import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    addVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },
    appendAnecdote(state, action) {
      //New anecdote is inside the action.payload
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToVote = state.anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = await anecdoteService.addVote(anecdoteToVote);
    dispatch(addVote(updatedAnecdote));
  }
}

export const { addVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
