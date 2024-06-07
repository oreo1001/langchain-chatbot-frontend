'use client'

import { getMessageList } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ChatList() {
    const messageList = useSelector(getMessageList)
    console.log(messageList)
    return (
        <>
            <div className="flex flex-row items-center bg-slate-100 px-2 rounded-lg">
                <div className="w-10 h-10 bg-red-300 rounded-xl"></div>
                <div className="py-3 pl-2">복무 제 4조에 대해서 알려줘</div>
            </div>
            <div>
                {messageList.map((message: string, index: number) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </>
    )
}