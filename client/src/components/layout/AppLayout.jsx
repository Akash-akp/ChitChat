import React from "react";
import { IoChatbubbles } from "react-icons/io5";
import mailIcon from "../../assets/Icons/mail.svg"
import mailSolidIcon from "../../assets/Icons/mailSolid.svg"
import chatIcon from "../../assets/Icons/chat.svg"
import chatSolidIcon from "../../assets/Icons/chatSolid.svg"
import heartIcon from "../../assets/Icons/heart.svg"
import heartSolidIcon from "../../assets/Icons/heartSolid.svg"
import binIcon from "../../assets/Icons/bin.svg"
import binSolidIcon from "../../assets/Icons/binSolid.svg"
import accountIcon from "../../assets/Icons/account.svg"
import accountSolidIcon from "../../assets/Icons/accountSolid.svg"
import Title from "../shared/Title.jsx";

const AppLayout = ({children}) => {
    return (
        <>
            <Title />
            <div className="flex bg-lightdarkgray w-[100vw] ">
                <div className="w-[80px] h-[95vh] bg-gray-800 my-[2.5vh] ml-6 rounded-xl flex flex-col relative items-center justify-between">
                    <IoChatbubbles className="fill-primary scale-150 my-[30px] " />
                    <div className="flex flex-col gap-[50px]">
                        <img src={mailIcon} className="scale-150" />
                        {/* <img src={mailSolidIcon} className="scale-150" /> */}
                        {/* <img src={chatIcon} className="scale-150" /> */}
                        <img src={chatSolidIcon} className="scale-150" />
                        <img src={heartIcon} className="scale-150" />
                        {/* <img src={heartSolidIcon} className="scale-150" /> */}
                        <img src={binIcon} className="scale-150" />
                        {/* <img src={binSolidIcon} className="scale-150" /> */}
                    </div>
                    <div className="flex flex-col gap-5 my-[30px]">
                        <img src={accountIcon} className="scale-150" />
                        {/* <img src={accountSolidIcon} className="scale-150" /> */}
                    </div>
                </div>
                <div className="relative w-full">
                    {children}
                </div>
            </ div>
        </>
        );
};

export default AppLayout;