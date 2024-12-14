import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import ChatBox from '../components/specific/ChatBox'
import ChatBoxDialog from '../components/dialog/ChatBoxDialog'
import Head from '../utils/Head'
import { useParams } from 'react-router-dom'
import NotificationListDialog from '../components/dialog/NotificationListDialog'
import NotificationList from '../components/specific/NotificationList'
import NotificationBox from '../components/specific/NotificationBox'

const Notifications = () => {
    const {notificationParamId} = useParams();
        const [notP,setNotP] = useState(notificationParamId);
        const [addBtnToggle,setAddBtnToggle] = useState(false);
        console.log("Home "+ notificationParamId)
        const [loading,setLoading] = useState(true);
        const[currentChat,setCurrentChat] = useState(null);
        const notPersons = [
            {
                name:"Jyotirmayee",
                Id : 6,
                description: "I am sister of Akash"
            },
            {
                name:"Kiran Kumari Parida",
                Id : 7,
                description: "I am also sister of Akash"
            }
        ];
    
        const currentChatFunction = ()=>{
            const chat = notPersons.find((chat)=>chat.Id==notificationParamId);
            setCurrentChat(chat);
        }
    
        console.log(currentChat)
    
        useEffect(()=>{
            setNotP(notificationParamId)
            currentChatFunction();
            setLoading(false);
        },[notificationParamId]);
  return (
    loading?(<></>):(
    <AppLayout>
        <div className='flex items-center w-full h-full mx-3'>
                <div className='flex h-[95%] relative w-full gap-2'>
                    <div className='w-[400px] flex flex-col gap-3'>
                        <div className='w-full h-[80px] bg-white rounded-xl flex items-center justify-center'>
                            <div className=' text-lg font-medium'>
                                Chit Chat Notification
                            </div>
                        </div>
                        <div className='h-full w-full bg-white border rounded-xl'>
                            {
                                notPersons.length==0? (<NotificationListDialog />) :(<NotificationList notification={notPersons} notificationParamId={notificationParamId} />)
                            }
                        </div>
                    </div>
                    <div className='w-[calc(100%-450px)] h-full relative'>
                        {
                            !notP? (<ChatBoxDialog />) :(<NotificationBox notP={notP} notPersons={notPersons} />)
                        }
                    </div>
                </div>
            </div>
    </AppLayout>)
  )
}

export default Notifications
