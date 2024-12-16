import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectRoute from './components/auth/ProtectRoute.jsx';
import Home from "./pages/Home.jsx";
import Profile from "./components/specific/Profile.jsx";
import Notification from './pages/Notifications.jsx';
import Login from "./pages/Login.jsx";
import axios from 'axios';

// Lazy import
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const [user, setUser] = useState(null);

  const foundUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }
  };

  const foundUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:8000/user/me', {
          headers: {
            token
          }
        });
        if (response.data?.foundUser?._id) {
          localStorage.setItem('UserId', response.data.foundUser._id);
        }
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  useEffect(()=>{
    foundUser();
  },[])

  useEffect(() => {
    foundUser();
    foundUserId();
  }, [user]);

  return (
    // Routing
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectRoute user={localStorage.getItem('token')!=null} />}>
            <Route path='/' element={<Home />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/notification/:notificationParamId' element={<Notification />} />
            <Route path='/chat' element={<Home />} />
            <Route path='/chat/:chatParamId' element={<Home />} />
            <Route path='/profile/:profileId' element={<Profile />} />
          </Route>

          {/* Login Route */}
          <Route element={<ProtectRoute user={localStorage.getItem('token')==null} redirect='/' />}>
            <Route path='/login' element={<Login setUser={setUser} />} />
          </Route>

          {/* Fallback Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* Toaster for Notifications */}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;