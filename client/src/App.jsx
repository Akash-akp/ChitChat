import React,{lazy} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProtectRoute from './components/auth/ProtectRoute.jsx'

// lazy import
const Home = lazy(()=> import("./pages/Home.jsx"))
const Chat = lazy(()=> import("./pages/Chat.jsx"))
const Groups = lazy(()=> import("./pages/Groups.jsx"))
const Login = lazy(()=> import("./pages/Login.jsx"))
const NotFound = lazy(()=> import("./pages/NotFound.jsx"))

const App = () => {
  const user = true;
  return (
    // Routing 
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectRoute user={user}/>} > 
          <Route path='/' element={<Home />} />
          <Route path='/chat/:chatId' element={<Chat />} />
          <Route path='/groups' element={<Groups />} />
        </ Route>

        <Route element={<ProtectRoute user={!user} redirect='/'/>}> 
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* Import Toast */}
      <Toaster />
    </BrowserRouter>
  )
}

export default App
