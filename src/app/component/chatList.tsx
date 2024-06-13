// 'use client'

// import { useAppSelector } from "@/redux/hooks";
// import { getMessageList } from "@/redux/slices/chatSlice";
// import { useEffect, useRef, useState } from "react";
// import { HumanBox, AIBox, ChatBox } from "./chatBox"

// interface ChatMessage {
//     speaker: 'human' | 'ai'
//     content: string
// }

// export default function ChatList() {
//     const messageList = useAppSelector(getMessageList);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const scrollToBottom = () => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
//     useEffect(() => {
//         scrollToBottom();
//     }, [messageList]);

//     return (
//         <div>
//             {messageList.map((message: ChatMessage, index: number) => (
//                 message.speaker == 'human' ? (
//                     <HumanBox key={index} content={message.content} speaker={"human"} />
//                 ) : (
//                     <AIBox key={index} content={message.content} speaker={"ai"} />
//                 )
//                 // <ChatBox key={index} content={message.content} speaker={"ai"}></ChatBox>
//             ))}
//             <div ref={messagesEndRef} />
//         </div>
//     );
// }