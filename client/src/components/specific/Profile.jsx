import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import proxyService1 from '../../proxyService1';

const Profile = () => {
    const {profileId} = useParams();
    const [loading,setLoading] = useState(true);
    const [personData,setPersonData] = useState(null);
    const currentProfileFunction = async()=>{
        console.log("profileId",profileId)
        setLoading(true);

        const response = await proxyService1.post('/user/findUser',{
                userId: profileId
            },{
            headers: {
                token: localStorage.getItem('token'), 
            }
        });
        console.log(response.data.foundUser);
        setPersonData(response.data.foundUser);
    }

    useEffect(()=>{
        currentProfileFunction();
        setLoading(false);
    },[profileId])

    return (
        <>
        {loading?(<h1>Loading....</h1>):(
            <AppLayout>
            <div className='bg-white h-full w-full rounded-xl relative flex flex-col gap-3 items-center py-[80px]'>
            <div className='bg-black h-[150px] w-[150px] rounded-full'>

            </div>
            <div className='text-3xl'>
                {personData?personData.userName:'Name not loaded'}
            </div>
            <div type='text' className='w-[90%] border border-black rounded-xl p-3 relative'>
                <div>
                    {personData?personData.description:'Not loaded yet'}
                </div>
            </div>
            <div className='w-full flex justify-end px-[5%]'>
                <div >
                    {
                        profileId == localStorage.getItem('UserId')? (
                            <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100'>
                                Change Bio
                            </div>
                            ):(
                            <div className='flex gap-3'>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center'>
                                    Remove Friend
                                </div>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center'>
                                    Archive Friend
                                </div>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center'>
                                    Block Friend
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        </AppLayout>
        
    )}
    </>
    )
}

export default Profile
