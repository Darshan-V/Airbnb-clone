import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Places from "./components/Home/Places"
import PropertyPage from "./components/Property/PropertyPage"

function App() {
  return (
    <div className="flex">
      <Router>
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/property" element={<PropertyPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
