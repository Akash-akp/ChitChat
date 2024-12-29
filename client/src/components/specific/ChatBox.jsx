import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '../../assets/Icons/sendIcon.svg'
import AttachIcon from '../../assets/Icons/attach-icon.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ChatBox = (
    currentChat
) => {
    const msgRef = useRef(null);

    const navigate = useNavigate();


    const [chatData,setChatData] = useState([]);

    const fetchChatData = async()=>{
        try {
            const response = await axios.post('http://localhost:8000/message/getAllMessages',{
                friendId:currentChat.currentChat._id
            },{
                headers:{
                    token:localStorage.getItem('token')
                }
            });
            console.log("response",response.data.messages);
            setChatData(response.data.messages);
        } catch (error) {
            console.log("error",error.message)
        }
    }

    const SendMessageHandler = async()=>{
        try{
            const response = await axios.post('http://localhost:8000/message/sendMessage',{
                receiverId:currentChat.currentChat._id,
                message:msgRef.current.value
            },{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            if(response.data){
                msgRef.current.value = '';
            }
        }catch(error){
            console.log("error",error.message);
        }
    }
    
    const ProfileButtonHandler = ()=>{
        navigate(`/profile/${currentChat?._id}`);
    }

    useEffect(()=>{
        console.log(currentChat.currentChat)
        fetchChatData();
    },[])


  return (
    <div className='flex flex-col gap-3 h-full relative'>
        <div className='h-[80px] bg-white rounded-xl flex items-center px-5 justify-between'>
            <div className='flex gap-3'>
                <div className='h-[50px] w-[50px] bg-black rounded-full'>

                </div>
                <div className='flex flex-col'>
                    <div className='text-lg'>
                        {currentChat?.currentChat?.userName}
                    </div>
                    <div className='text-sm text-gray-600'>
                        {currentChat?.currentChat?.mode?(curr.currentChat.mode):("Offline")}
                    </div>
                </div>
            </div>
            <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100' onClick={ProfileButtonHandler}>
                Profile
            </div>
        </div>

        <div className='h-[calc(100vh-160px)] bg-white rounded-xl overflow-y-scroll'>
            {chatData?(
                <div className='relative'>
                     {chatData.map((data,index)=>{
                        if(data.senderId==currentChat.currentChat._id){
                            return(
                                <div key={index} className='bg-primary text-white block m-2 p-2 rounded-r-xl rounded-tl-xl  max-w-[50%] w-fit'>
                                    {data.message}
                                </div>
                            )
                        }else{
                            return(
                                <div key={index} className='flex justify-end'>
                                    <div className='bg-gray-700 text-white block m-2 p-2 rounded-l-xl rounded-tr-xl  max-w-[50%] w-fit text-right relative right-0'>
                                        {data.message}
                                    </div>
                                </div>
                            )
                        }
                    })} 
                    {/*  */}
                </div>
            ):(
                <div>No Message</div>
            )}
        </div>

        <div className='h-[60px] flex w-full relative gap-3'>
            <div className='w-full bg-white rounded-xl flex items-center'>
                <div className='w-[60px] flex justify-center cursor-pointer'>
                    <img src={AttachIcon} alt="" className='scale-150' />
                </div>
                <input ref={msgRef} type='text' placeholder='Write messages...' className='w-full h-full rounded-xl outline-none' />
            </div>
            <div className='w-[60px] h-[60px] bg-primary rounded-xl flex justify-center items-center cursor-pointer' onClick={SendMessageHandler}>
                <img src={SendIcon} alt="" className='scale-150 relative top-[5px]' />
            </div>
        </div>

    </div>
  )
}

export default ChatBox
