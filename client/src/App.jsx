import React,{lazy, Suspense, useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import Home from "./pages/Home.jsx"
import Profile from "./components/specific/Profile.jsx";
import Notification from './pages/Notifications.jsx';
import Login from "./pages/Login.jsx";
import axios from 'axios'

// lazy import
const NotFound = lazy(()=> import("./pages/NotFound.jsx"))

const App = () => {
  const [user,setUser] = useState(null);
  const foundUser = ()=>{
    if(localStorage.getItem('token')){
      setUser(localStorage.getItem('token'));
    }else{
      setUser(null);
    }
  }

  const foundUserId = async()=>{
    if(localStorage.getItem('token')){
      const response = await axios.get('http://localhost:8000/user/me',{
        headers:{
          token: localStorage.getItem('token')
        }
      });
      localStorage.setItem('UserId',response.data.foundUser._id);
    }
  }

  useEffect(()=>{
    foundUser();
    foundUserId();
  },[localStorage.getItem('token')])

  return (
    // Routing 
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route element={<ProtectRoute user={user}/>} > 
          <Route path='/' element={<Home/>} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/notification/:notificationParamId' element={<Notification />} />
          <Route path='/chat' element={<Home />} />
          <Route path='/chat/:chatParamId' element={<Home />} />
          <Route path='/profile/:profileId' element={<Profile />} />
        </ Route>

        <Route element={<ProtectRoute user={!user} redirect='/'/>}> 
          <Route path='/login' element={<Login setUser={setUser}/>} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
      {/* Import Toast */}
      <Toaster />
    </BrowserRouter>
  )
}

export default App
