import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const bookingsApi = createApi({
  reducerPath: "bookings",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/bookings/`,
    credentials: "include"
  }),

  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (propertyId) => `/${propertyId}`
    })
  })
})

export const { useGetBookingsQuery } = bookingsApi
