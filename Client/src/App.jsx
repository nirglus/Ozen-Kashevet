import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat/chatPage'
import Auth from './pages/auth/auth'
import Navbar from './components/navbar/navbar'
import Dashboard from './pages/dashboard/dashboard'
import { UserContext } from './managers/userManager'
import UserProfile from './pages/profile/UserProfile'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {user ,userIn} = useContext(UserContext)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  const contentMargin = isCollapsed ? '' : 'ml-72 w-4/5';

  return (
    <BrowserRouter>
      <Navbar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={contentMargin}>
        <Routes>
          {userIn?(
            <>
          <Route path='/chat' element={<ChatPage />}></Route>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/therapists' element={<Dashboard />}></Route>
          <Route path='/profile' element={<UserProfile />}></Route>
            </>
          ):(
            <>
          <Route path='/' element={<Auth />}></Route>
          <Route path='/home'></Route>
            </>
          )
          }

          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
