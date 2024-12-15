import React,{lazy, Suspense, useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import Home from "./pages/Home.jsx"
import Profile from "./components/specific/Profile.jsx";
import Notification from './pages/Notifications.jsx';
import Login from "./pages/Login.jsx";

// lazy import
const NotFound = lazy(()=> import("./pages/NotFound.jsx"))

const App = () => {
  const [user,setUser] = useState(false);

  const foundUser = ()=>{
    if(localStorage.getItem('token')){
    console.log(localStorage.getItem('token'));
      setUser(true);
    }else{
      setUser(false);
    }
  }

  useEffect(()=>{
    foundUser();
  },[])

  const userId = 1;
  return (
    // Routing 
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route element={<ProtectRoute user={user}/>} > 
          <Route path='/' element={<Home />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/notification/:notificationParamId' element={<Notification />} />
          <Route path='/chat' element={<Home />} />
          <Route path='/chat/:chatParamId' element={<Home />} />
          <Route path='/profile/:profileId' element={<Profile />} />
        </ Route>

        <Route element={<ProtectRoute user={!user} redirect='/'/>}> 
          <Route path='/login' element={<Login setUser={setUser} />} />
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
