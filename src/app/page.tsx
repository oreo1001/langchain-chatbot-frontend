import Image from "next/image";
import ChatList from "./chatList";
import { TiLocationArrow } from "react-icons/ti";
import React, { useState } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen min-h-screen bg-white">
      <div className="flex flex-col pt-[100px] w-[600px] h-full">
        <div className="flex text-4xl font-bold p-5">국가 공무원 복무규정</div>
        <div className="h-8"></div>
        <div className="flex-grow">
          <div className="flex flex-row items-center px-2">
            <div className="w-10 h-10 bg-yellow-300 rounded-xl"></div>
            <div className="flex flex-col pl-2 py-3">
              <div className="flex">반갑습니다! 저는 복무규정 Q&A봇 Sapie입니다.</div>
              <div className="flex">궁금한 사항에 대해 질문해 주세요!</div>
            </div>
          </div>
          <ChatList></ChatList>
        </div>
        <div className="flex w-full bg-gray-200 rounded-lg px-3 py-2 mb-10 border-2 border-gray-200 focus-within:border-2 focus-within:border-red-500 group">
          <input
            placeholder="Your message"
            type="text"
            className="w-full focus:outline-none bg-transparent text-slate-600"
          />
          <div className="flex-grow"></div>
          <div className="flex justify-end"><TiLocationArrow className="w-7 h-7"></TiLocationArrow></div>
        </div>
      </div>
    </div>
  );
}
