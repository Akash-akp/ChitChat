import React,{lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import Home from "./pages/Home.jsx"
import Profile from "./components/specific/Profile.jsx";
import Notification from './pages/Notifications.jsx';

// lazy import
const Chat = lazy(()=> import("./pages/Chats.jsx"))
const Login = lazy(()=> import("./pages/Login.jsx"))
const NotFound = lazy(()=> import("./pages/NotFound.jsx"))

const App = () => {
  const user = true;
  const userId = 1;
  return (
    // Routing 
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Routes>

        <Route element={<ProtectRoute user={user}/>} > 
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Home />} />
          <Route path='/chat/:chatParamId' element={<Home />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/notification/:notificationParamId' element={<Notification />} />
          <Route path='/profile/:profileId' element={<Profile />} />
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
