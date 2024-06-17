import Image from "next/image";
import React from 'react';
import ChatMain from "./testMain";

export default function Home() {
    return (
        <div className="flex flex-col items-center h-screen min-h-screen bg-white">
            <div className="flex flex-col pt-[80px] w-[700px] h-full">
                {/* <ChatNav></ChatNav> */}
                <div className="flex text-4xl font-bold p-5">업무 매뉴얼(version2)</div>
                <div className="h-8"></div>
                <ChatMain></ChatMain>
            </div>
        </div>
    );
}