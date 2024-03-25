import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat/chatPage'
import Auth from './pages/auth/auth'
import Navbar from './components/navbar/navbar'
import Dashboard from './pages/dashboard/dashboard'
function App() {

  return (
    <BrowserRouter>
      {/* <UserManager>
        <Navbar></Navbar> */}
      <Navbar />
      <Routes>
        <Route path='/'></Route>
        <Route path='/chat' element={<ChatPage />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>

      {/* </UserManager> */}
    </BrowserRouter>
  )
}

export default App
