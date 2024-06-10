import Image from "next/image";
import ChatList from "./component/chatList";
import { TiLocationArrow } from "react-icons/ti";
import React, { useState } from 'react';
import InputBox from "./component/inputBox";
import ChatNav from "./component/chatNav";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen min-h-screen bg-white">
      <div className="flex flex-col pt-[80px] w-[700px] h-full">
        <ChatNav></ChatNav>
        <div className="flex text-4xl font-bold p-5">국가 공무원 복무규정</div>
        <div className="h-8"></div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-row items-center px-2">
            <div className="w-10 h-10 rounded-xl ml-3 mr-2">
              <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col pl-2 py-3">
              <div className="flex">반갑습니다! 저는 복무규정 Q&A봇 Sapie입니다.</div>
              <div className="flex">궁금한 사항에 대해 질문해 주세요!</div>
            </div>
          </div>
          <ChatList></ChatList>
        </div>
        <InputBox></InputBox>
      </div>
    </div>
  );
}
