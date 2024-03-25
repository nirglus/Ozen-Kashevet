import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat/chatPage'
import Auth from './pages/auth/auth'

function App() {

  return (
    <BrowserRouter>
      {/* <UserManager>
        <Navbar></Navbar> */}
      <Routes>
        <Route path='/chat' element={<ChatPage />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
      </Routes>

      {/* </UserManager> */}
    </BrowserRouter>
  )
}

export default App
