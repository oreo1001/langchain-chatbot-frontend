'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMessageToList, getMessageList } from '@/redux/slices/chatSlice';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiLocationArrow } from 'react-icons/ti';
import { AIBox, HumanBox } from './chatBox';

export default function ChatMain() {
    interface ChatMessage {
        speaker: 'human' | 'ai'
        content: string
    }
    const messageList = useAppSelector(getMessageList);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [loading, setLoading] = useState(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const dispatch = useAppDispatch()
    const clickfunc = async (event: React.FormEvent) => {
        event.preventDefault();
        setInputValue(''); // 메시지 전송 후 입력 필드 초기화
        if (loading) return; // 이미 로딩 중일 때는 중복 클릭 방지

        dispatch(addMessageToList({ content: inputValue, speaker: 'human' }));
        setLoading(true);
        const response = await fetch('http://localhost:5000/stream/ask', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ question: inputValue, session_id: '123' }),
        });
        console.log(response)
        const newEventSource = new EventSource('http://localhost:5000/stream/test');
        setEventSource(newEventSource);

        newEventSource.onmessage = (event) => {
            setData(prevData => {
                const updatedMessage = event.data.replace(/🖐️/g, '\n');
                const updatedData = [...prevData, updatedMessage];
                if (event.data.includes('\u200C')) { // 마지막 메시지가 'Done'을 포함하면
                    newEventSource.close(); // EventSource 닫기
                    console.log('EventSource closed because of "Done" message');
                    setLoading(false);
                }
                return updatedData;
            });
            console.log(data)
        };

    }
    useEffect(() => {
        return () => {
            if (eventSource) eventSource.close();
        };
    }, [eventSource]);

    return (<div className="flex-grow overflow-y-auto">
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
        <div>

        </div>
        <>
            {messageList.map((message: ChatMessage, index: number) => (
                <HumanBox key={index} content={message.content} speaker={"human"} />
                // <ChatBox key={index} content={message.content} speaker={"ai"}></ChatBox>
            ))}
            <div ref={messagesEndRef} />
        </>
        <AIBox data={data} />
        <div className="flex w-full bg-[#F4F4F4] rounded-lg px-3 py-2 mb-6 mt-4 border-2 border-[#F4F4F4] focus-within:border-2 focus-within:border-red-300 group">
            <input
                placeholder="메시지 입력"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                // onKeyDown={handleKeyPress}
                className="w-full focus:outline-none bg-transparent text-slate-600"
            />
            <div className="flex-grow"></div>
            <button className="flex justify-end" onClick={clickfunc} disabled={loading}>
                {loading ? <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" /> : <TiLocationArrow className="w-7 h-7" />}
            </button>
        </div>
    </div>
    );
}