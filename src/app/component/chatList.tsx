'use client'

import { useAppSelector } from "@/redux/hooks";
import { getMessageList } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { HumanBox, AIBox } from "./chatBox"

interface ChatMessage {
    speaker: 'human' | 'ai'
    content: string
}

export default function ChatList() {
    const messageList = useAppSelector(getMessageList);

    return (
        <div>
            {messageList.map((message: ChatMessage, index: number) => (
                message.speaker == 'human' ? (
                    <HumanBox key={index} content={message.content} speaker={"human"} />
                ) : (
                    <AIBox key={index} content={message.content} speaker={"ai"} />
                )
            ))}
        </div>
    );
}