import Image from "next/image";
// import ChatList from "./component/chatList";
import React from 'react';
import InputBox from "./component/inputBox";
import ChatNav from "./component/chatNav";
import InputTest from "./component/inputTest";
import ChatMain from "./component/chatMain";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen min-h-screen bg-white">
      <div className="flex flex-col pt-[80px] w-[700px] h-full">
        <ChatNav></ChatNav>
        <div className="flex text-4xl font-bold p-5">업무 매뉴얼</div>
        <div className="h-8"></div>
        <ChatMain></ChatMain>
      </div>
    </div>
  );
}
