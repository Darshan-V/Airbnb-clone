## REVIEWS

- [x] move routes to routes folder
- [ ] read cors mdn
- [x] exception handling in controllers
- [ ] use session data to get user details after login
- [x] handle exception according to the response
- [x] move the checkAvailableSlots to the booking route -> dep: calender
- [x] fix date slice Reservation.jsx
- [ ] store updated session somewhere
- [ ] send the session details to the frontend
- [ ] BUG signup confirm password mismatch -> registered : split credentials check into functions: no trim password
- [x] signin error response for wrong password
- [x] send proper status code never error object

* Bcrypt.compare returns true when password matched and return false when not matched

- [x] add route for filter
- [x] error message on checkin and checkout indivisualy disable reserve button on invalid dates
- [ ] React date picker / disable booked dates
- [x] use query params for the filter/search -> one filter api
- [x] file naming use only camelCase
- [x] implement the middleware for verify token
- [ ] fix routes / move route prefix to the app.js
- [x] move verify token to middleware folder
- [ ] better exception handling {backend} different error codes for all the possible cases
- [ ] validations backend
- [x] include created at to all the tables

Frontend

- [ ] default map center getfrom geolocation
- [x] include routes for mapview, filter, search
- [ ] break down reservation component to smaller components
- [x] implement models using ui library -> done on search
- [ ] make a priority list
- [x] hide price when invalid date and slot unavailable
- [x] \*\*\* Layout
- [x] Loading page
- [ ] add search string in the store and retrive it when back on home
- [ ] strictly aviod optional chaining in backend
- [ ] clear res.cookie on logout
