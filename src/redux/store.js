import { configureStore } from "@reduxjs/toolkit"

import reservationReducer from "./reservationSlice"

export const store = configureStore({
  reducer: { reservation: reservationReducer }
})
