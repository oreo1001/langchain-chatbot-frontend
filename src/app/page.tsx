import Image from "next/image";
import ChatList from "./component/chatList";
import React from 'react';
import InputBox from "./component/inputBox";
import ChatNav from "./component/chatNav";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen min-h-screen bg-white">
      <div className="flex flex-col pt-[80px] w-[700px] h-full">
        <ChatNav></ChatNav>
        <div className="flex text-4xl font-bold p-5">업무 매뉴얼</div>
        <div className="h-8"></div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-row items-start px-2">
            <div className="w-10 h-10 rounded-xl ml-3 mr-2">
              <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col pl-2 pt-1 pb-3">
              <div className="flex tracking-normal leading-7 whitespace-pre-line pb-2">
                <span>반갑습니다!</span>
                <span role="img" aria-label="hi">🖐️</span>
              </div>
              <div className="flex tracking-normal leading-7 whitespace-pre-line pb-2">저는 업무 매니얼 Q&A봇입니다.</div>
              <div className="flex tracking-normal leading-7 whitespace-pre-line pb-2">궁금한 사항에 대해 질문해 주세요!</div>
            </div>
          </div>
          <ChatList></ChatList>
        </div>
        <InputBox></InputBox>
      </div>
    </div>
  );
}
