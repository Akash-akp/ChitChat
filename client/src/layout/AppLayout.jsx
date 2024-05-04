import React from "react";
import { IoChatbubbles } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { RiChat3Line } from "react-icons/ri";
import { RiChat3Fill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiBellThin } from "react-icons/pi";



const AppLayout = ({Children}) => {
    return (
        <div className="flex">
            <div className="w-[80px] h-[95vh] bg-gray-800 my-[2.5vh] ml-6 rounded-xl flex flex-col relative items-center">
                <IoChatbubbles className="fill-primary scale-150 my-[30px] " />
                <div className="flex flex-col gap-5">
                    <CiMail className="fill-white scale-150" />
                    {/* <IoMdMail className="fill-primary scale-150 "/> */}
                    <RiChat3Line className="fill-white scale-150" stroke-width="1" />
                    {/* <RiChat3Fill className="fill-primary scale-150" /> */}
                    {/* <IoNotificationsOutline className="fill-white stroke-white scale-150" /> */}
                    <PiBellThin className="fill-white stroke-white scale-150" />
                </div>
                <div>

                </div>
            </div>
            <div>
                {Children}
            </div>
            <div>Footer</div>
        </ div>
        );
};

export default AppLayout;