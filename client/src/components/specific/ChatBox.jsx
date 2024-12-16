import React, { useEffect, useState } from 'react'
import SendIcon from '../../assets/Icons/sendIcon.svg'
import AttachIcon from '../../assets/Icons/attach-icon.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ChatBox = (
    currentChat
) => {

    const navigate = useNavigate();
    
    const curr = JSON.parse(JSON.stringify(currentChat));
    console.log("curr",curr)

    const [perChat,setPerChat] = useState(null);


    // const chatData = [
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Hi there! How are you doing today?",
    //     },
    //     {
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Hey! I’m doing well, thanks for asking. How about you?"
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"I’m good too. I was just thinking about the new project we’re starting. Any ideas on what we should focus on first?",
    //     },
    //     {
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Hmm, we should probably define the scope of the project first. Make sure everyone is on the same page."
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Great point. I’ll start working on the project outline, and we can review it together. What do you think?",
    //     },
    //     {
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Sounds good. Once the outline is ready, we can break it down into tasks and assign them. We should also make a timeline."
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Agreed! I’ll draft the outline tonight. Let’s meet tomorrow to go over it.",
    //     },
    //     {
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Perfect. I’ll prepare some suggestions as well. See you tomorrow!"
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Looking forward to it. Bye!",
    //     },
    //     {
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Bye"
    //     },
    //     {
    //         senderId: 2,
    //         recieverId: 0,
    //         msg:"Hii Akash"
    //     },
    //     {
    //         senderId: 0,
    //         recieverId: 2,
    //         msg:"Hii Aakriti!! What's up"
    //     },
    //     {
    //         senderId:4,
    //         recieverId:0,
    //         msg:"Hii Akash"
    //     },
    //     {
    //         senderId:0,
    //         recieverId:4,
    //         msg:"Hii Lazy Person"
    //     },
    //     {
    //         senderId:3,
    //         recieverId:0,
    //         msg:"Hii Akash"
    //     },
    //     {
    //         senderId:0,
    //         recieverId:3,
    //         msg:"Hii Bro"
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Hi",
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Hi",
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Hi",
    //     },
    //     {   
    //         senderId: 0,
    //         recieverId:1,
    //         msg:"Hi",
    //     },
    //     {   
    //         senderId: 1,
    //         recieverId:0,
    //         msg:"Hi there! How are you doing today?",
    //     },
    // ];

    const PerChatHandler = ()=>{
        let perC = [];
        // chatData.forEach((data)=>{
        //     if(data.senderId==curr.currentChat.Id||data.recieverId==curr.currentChat.Id){
        //         perC.push(data);
        //     }
        // })
        setPerChat(perC);
    }
    
    const ProfileButtonHandler = ()=>{
        navigate(`/profile/${curr.currentChat._id}`);
    }

    // useEffect(()=>{
    //     PerChatHandler();
    // },[curr.currentChat.Id])

  return (
    <div className='flex flex-col gap-3 h-full relative'>
        <div className='h-[80px] bg-white rounded-xl flex items-center px-5 justify-between'>
            <div className='flex gap-3'>
                <div className='h-[50px] w-[50px] bg-black rounded-full'>

                </div>
                <div className='flex flex-col'>
                    <div className='text-lg'>
                        {curr?.currentChat?.userName}
                    </div>
                    <div className='text-sm text-gray-600'>
                        {curr?.currentChat?.mode?(curr.currentChat.mode):("Offline")}
                    </div>
                </div>
            </div>
            <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100' onClick={ProfileButtonHandler}>
                Profile
            </div>
        </div>

        <div className='h-[calc(100vh-160px)] bg-white rounded-xl overflow-y-scroll'>
            {perChat?(
                <div className='relative'>
                    {/* {perChat.map((data,index)=>{
                        if(data.senderId==curr.currentChat.Id){
                            return(
                                <div key={index} className='bg-primary text-white block m-2 p-2 rounded-r-xl rounded-tl-xl  max-w-[50%] w-fit'>
                                    {data.msg}
                                </div>
                            )
                        }else{
                            return(
                                <div key={index} className='flex justify-end'>
                                    <div className='bg-gray-700 text-white block m-2 p-2 rounded-l-xl rounded-tr-xl  max-w-[50%] w-fit text-right relative right-0'>
                                        {data.msg}
                                    </div>
                                </div>
                            )
                        }
                    })} */}
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
                <input type='text' placeholder='Write messages...' className='w-full h-full rounded-xl outline-none' />
            </div>
            <div className='w-[60px] h-[60px] bg-primary rounded-xl flex justify-center items-center cursor-pointer'>
                <img src={SendIcon} alt="" className='scale-150 relative top-[5px]' />
            </div>
        </div>

    </div>
  )
}

export default ChatBox
