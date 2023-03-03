import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Places from "./components/Home/Places"
import Login from "./components/Login/Login"
import Signup from "./components/Login/Signup"
import BookingSlots from "./components/Property/BookingSlots"
import PropertyImages from "./components/Property/PropertyImages"
import PropertyPage from "./components/Property/PropertyPage"
import Summary from "./components/Property/Summary"

function App() {
  return (
    <div className="flex flex-col  m-auto">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/home/:type?/filter?" element={<Places />} />
          <Route path="/property/:id?/?" element={<PropertyPage />} />
          <Route path="/bookings/:id?" element={<BookingSlots />} />
          <Route
            path="/property_images/:property_id?/:user_id?"
            element={<PropertyImages />}
          />
          <Route path="/summary/:bookingId" element={<Summary />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
