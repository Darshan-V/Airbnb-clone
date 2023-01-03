import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Places from "./components/Home/Places"
import BookingSlots from "./components/Property/BookingSlots"
import PropertyImages from "./components/Property/PropertyImages"
import PropertyPage from "./components/Property/PropertyPage"

function App() {
  return (
    <div className="flex ">
      <Router>
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/booking" element={<BookingSlots />} />
          <Route path="/property_images/:id" element={<PropertyImages />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
