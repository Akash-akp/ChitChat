import React,{lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import Home from "./pages/Home.jsx"
import Profile from "./components/specific/Profile.jsx";

// lazy import
const Chat = lazy(()=> import("./pages/Chat.jsx"))
const Groups = lazy(()=> import("./pages/Groups.jsx"))
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
          <Route path='/chat/:chatParamId' element={<Home />} />
          <Route path='/groups' element={<Groups />} />
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
