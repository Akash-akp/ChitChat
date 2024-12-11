import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Profile = () => {
    const {profileId} = useParams();
    console.log(profileId);
    const [loading,setLoading] = useState(true);
    const [personData,setPersonData] = useState(null);
    const [profileData,setProfileData] = useState(null);
    const profilePerson = [
        {
            Id : 1,
            Profile: "A pre-final year student, passionate developer with expertise in developing two major projects that seamlessly blend programming and problem-solving. I love solving Data Structures and Algorithms (DSA) questions and dedicated to teaching and assisting others. Known for consistently pushing boundaries and thriving outside of comfort zones"
        },{
            Id : 2,
            Profile: "I am gorgeous"
        },{
            Id : 3,
            Profile: "I am lazy"
        }
    ];
    const chatPersons = [
        {
            name:"Akash Kumar Parida",
            Id : 1
        },{
            name:"Aakriti Nayak",
            Id : 2,
            mode: "Online"
        },{
            name:"K Simran",
            Id : 3
        }
    ];
    const isBioPresent = true;

    const currentProfileFunction = ()=>{
        const profile = profilePerson.find((prof)=>prof.Id==profileId);
        const person = chatPersons.find((chat)=>chat.Id==profileId);
        setPersonData(person);
        setProfileData(profile);
    }

    useEffect(()=>{
        currentProfileFunction();
        setLoading(false);
    },[profileId])

    return (
        <>
        {loading?(<h1>Loading....</h1>):(
            <div className='bg-white h-full w-full rounded-xl relative flex flex-col gap-3 items-center py-[80px]'>
            <div className='bg-black h-[150px] w-[150px] rounded-full'>

            </div>
            <div className='text-3xl'>
                {personData.name}
            </div>
            <div type='text' className='w-[90%] border border-black rounded-xl p-3 relative'>
                {
                    !isBioPresent?
                    (
                        <textarea className='w-full h-full outline-none' placeholder='Write your bio...'/>
                    ):(
                        <div>
                            {profileData.Profile}
                        </div>
                    )
                }
            </div>
            <div className='w-full flex justify-end px-[5%]'>
                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100'>
                    {
                        !isBioPresent?
                        (
                            <>Save Bio</>
                        ):(
                            <>Change Bio</>
                        )
                    }
                </div>
            </div>
        </div>
        
    )}
    </>
    )
}

export default Profile
