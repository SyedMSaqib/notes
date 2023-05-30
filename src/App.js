import "./App.css"
import NaveBar from "./components/Navebar"
import Home from "./components/Home"
import About from "./components/About"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NoteState from "./context/notes/NoteState"

function App() {
  return (
    
    <NoteState>
      <BrowserRouter>
        <NaveBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
  )
}

export default App
