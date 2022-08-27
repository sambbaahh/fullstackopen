import Anecdotereducer from "./reducers/anecdoteReducer"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        anecdotes: Anecdotereducer
    }
})

export default store