import React , {lazy, useEffect, useState} from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useParams } from 'react-router-dom'

const Head = lazy(()=> import('../utils/Head'))
const ChatListDialog = lazy(()=>import('../components/dialog/ChatListDialog'))
const ChatList = lazy(()=>import('../components/specific/ChatList'))
const ChatBoxDialog = lazy(()=>import('../components/dialog/ChatBoxDialog'))
const ChatBox = lazy(()=>import('../components/specific/ChatBox'))

const Home = () => {
    const {chatParamId} = useParams();
    const [chatP,setChatP] = useState(chatParamId);
    console.log("Home "+ chatParamId)
    const [loading,setLoading] = useState(true);
    const[currentChat,setCurrentChat] = useState(null);
    const chatPersons = [
        {
            name:"Akash Kumar Parida",
            Id : 1
        },{
            name:"Aakriti Nayak",
            Id : 2,
            mode: "Online"
        },
        {
            name:"Abhisek Nandi",
            Id : 3
        },
        {
            name:"K Simran",
            Id : 4
        }
    ];



    const currentChatFunction = ()=>{
        const chat = chatPersons.find((chat)=>chat.Id==chatParamId);
        setCurrentChat(chat);
    }

    console.log(currentChat)

    useEffect(()=>{
        setChatP(chatParamId)
        currentChatFunction();
        setLoading(false);
    },[chatParamId]);
  return (
    <AppLayout>
        {
            loading?(<>Loading</>):(
        <div className='flex items-center w-full h-full mx-3'>
            <div className='flex h-[95%] relative w-full gap-2'>
                <div className='w-[400px] flex flex-col gap-3'>
                    <div>
                        <Head />
                    </div>
                    <div className='h-full w-full bg-white border rounded-xl'>
                        {
                            chatPersons.length==0? (<ChatListDialog />) :(<ChatList chats={chatPersons} chatParamId={chatParamId} />)
                        }
                    </div>
                </div>
                <div className='w-[calc(100%-450px)] h-full relative'>
                    {
                        !chatP? (<ChatBoxDialog />) :(<ChatBox currentChat={currentChat} />)
                    }
                </div>
            </div>
        </div>
    )}
    </AppLayout>
  )
}

export default Home;
