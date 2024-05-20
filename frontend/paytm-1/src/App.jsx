
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
// import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './pages/NavBar'
import OtherUsers from './pages/OtherUsers.jsx'
import SendMoney from './pages/SendMoney'
import Transactions from './pages/Transactions'

function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="sendmoney/*" element={<SendMoney />} />
          <Route path="/otherusers" element={<OtherUsers />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
