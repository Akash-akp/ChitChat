import React, { useContext, useEffect, useRef, useState } from 'react'
import SendIcon from '../../assets/Icons/sendIcon.svg'
import AttachIcon from '../../assets/Icons/attach-icon.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import proxyService1 from '../../proxyService1'
import proxyService2 from '../../proxyService2'
import { AppContext } from '../../context/AppProvider'

const ChatBox = (
    currentChat
) => {
    const msgRef = useRef(null);
    const wsRef = useContext(AppContext).wsRef;

    const navigate = useNavigate();


    const [chatData,setChatData] = useState([]);

    const fetchChatData = async()=>{
        try {
            const response = await proxyService1.post('/message/getAllMessages',{
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
            const response = await proxyService1.post('/message/sendMessage',{
                receiverId:currentChat.currentChat._id,
                message:msgRef.current.value
            },{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            const messagePayload = {
                type: 'message',
                senderId: localStorage.getItem('UserId'),
                receiverId: currentChat.currentChat._id,
                message: msgRef.current.value,
            };
        
            wsRef.current.send(JSON.stringify(messagePayload));
            console.log("Message sent:", JSON.stringify(messagePayload));
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
        fetchChatData();
        console.log("WsRef",wsRef.current);
        wsRef.current.onmessage = (message)=>{
            const res = JSON.parse(message.data);
            if(res.type == 'message'){
                setChatData((chat)=>[...chat,res]);
            }
        }
        
        console.log(wsRef.current)
    },[currentChat,setChatData])


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
