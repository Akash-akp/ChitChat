import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ChatBoxDialog = () => {
  const [loading ,setLoading] = useState(true);
  const [userName , setUserName] = useState('');

  const fetchName = async()=>{ 
    const foundUser = await axios.get('http://localhost:8000/user/me',{
      headers:{
        token: localStorage.getItem('token')
      }
    });
    setUserName(foundUser.data.foundUser.userName);
    console.log(foundUser.data.foundUser.userName)
  }

  useEffect(()=>{
    fetchName();
    setLoading(false);
  },[])
  
  if(loading){
    return (<div>Loading</div>)
  }

  return (
    <div className='w-full h-full bg-white rounded-xl flex flex-col justify-center items-center'>
        <div className='text-3xl'>
            Hi {userName} !!!
        </div>
        <div className='text-3xl'>
            Chit Chat with your Friends
        </div>
    </div>
  )
}

export default ChatBoxDialog
