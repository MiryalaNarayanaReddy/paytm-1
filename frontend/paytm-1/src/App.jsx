
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
// import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './pages/NavBar'


function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
