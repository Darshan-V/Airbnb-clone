import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./feature/filter"

export const store = configureStore({
  reducer: {
    searchQuery: filterReducer
  }
})
