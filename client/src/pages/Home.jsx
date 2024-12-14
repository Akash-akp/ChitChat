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
    const [addBtnToggle,setAddBtnToggle] = useState(false);
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

    const AddBtnHandler = () => {
        setAddBtnToggle(!addBtnToggle);
    }

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
    <div className='relative'>
        <AppLayout>
            {
                loading?(<>Loading</>):(
            <div className='flex items-center w-full h-full mx-3'>
                <div className='flex h-[95%] relative w-full gap-2'>
                    <div className='w-[400px] flex flex-col gap-3'>
                        <div>
                            <Head AddBtnHandler={AddBtnHandler} />
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
        <div className={(addBtnToggle?(''):('hidden'))}>
            <div className='absolute h-full w-full flex justify-center items-center top-0 left-0 '>
                <div className='absolute h-full w-full bg-black z-1 opacity-50' onClick={AddBtnHandler}>

                </div>
                <div className='h-[300px] w-[600px] bg-white rounded-xl border relative z-2 flex flex-col justify-center'>
                    <div className='text-[30px] mx-10 my-2' >
                        Add a friend
                    </div>
                    <div className='flex flex-col items-center justify-around h-[150px]'>
                        <div className='h-[55px] w-[80%] relative'>
                            <input className='h-full w-full p-7 text-lg border border-gray-400 rounded-full' type='text' placeholder='Search Email' />
                        </div>
                        <button className='bg-primary py-3 px-7 rounded-full text-white hover:bg-orange-700' onClick={AddBtnHandler}>
                            Send Request
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home;
