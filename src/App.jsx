import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Places from "./components/Home/Places"
import Login from "./components/Login/Login"
import BookingSlots from "./components/Property/BookingSlots"
import PropertyImages from "./components/Property/PropertyImages"
import PropertyPage from "./components/Property/PropertyPage"
import Topbar from "./components/Topbar/Topbar"

function App() {
  return (
    <div className="flex flex-col">
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/:userid?" element={<Places />} />
          <Route path="/property/:id?/:userid?" element={<PropertyPage />} />
          <Route
            path="/booking/:userName?/:propertyname?"
            element={<BookingSlots />}
          />
          <Route path="/property_images/:id" element={<PropertyImages />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
