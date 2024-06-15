import Attendence from "./pages/Attendence"
import { Routes,Route } from "react-router-dom"
import Calendar from "./pages/Calender/Calender"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Attendence />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  )
}

export default App
