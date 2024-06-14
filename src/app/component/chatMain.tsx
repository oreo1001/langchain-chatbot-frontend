'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMessageToList, getMessageList, getPrevious, setPrevious } from '@/redux/slices/chatSlice';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClear, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiLocationArrow } from 'react-icons/ti';
import { AIBox, HumanBox } from './chatBox';

export default function ChatMain() {
    interface ChatMessage {
        speaker: 'human' | 'ai'
        content: string
    }
    // const messageList = useAppSelector(getMessageList);

    const [messageList, setMessageList] = useState<ChatMessage[]>([]);
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    function handleReset() {
        setMessageList([]);
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            clickfunc(event);
        }
    };

    const clickfunc = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return; // 이미 로딩 중일 때는 중복 클릭 방지
        setLoading(true);
        const currentInputValue = inputValue;
        messageList.push({ content: currentInputValue, speaker: 'human' })
        setInputValue(''); // 메시지 전송 후 입력 필드 초기화

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/stream/ask', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ question: currentInputValue, session_id: '354' }),
            });
            const newEventSource = new EventSource(process.env.NEXT_PUBLIC_API_SERVER + '/stream/test');

            newEventSource.onmessage = (messageEvent) => {
                const updatedMessage = messageEvent.data.replace(/🖐️/g, '\n');
                setData(prevData => [...prevData, updatedMessage]);
                if (messageEvent.data.includes('\u200C')) { // 마지막 메시지가 'Done'을 포함하면
                    setData(prevData => {
                        const completeMessage = prevData.join('');
                        messageList.push({ content: completeMessage, speaker: 'ai' })
                        return [];
                    });
                    newEventSource.close(); // EventSource 닫기
                    setLoading(false);
                    setData([]);
                }
            };

            newEventSource.onerror = (error) => {
                console.error('EventSource error:', error);
                newEventSource.close();
                setLoading(false);
            };
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };
    return (
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
            <div>
                {messageList.map((message: ChatMessage, index: number) => (
                    message.speaker === 'human' ? (
                        <HumanBox key={index} content={message.content} speaker={'human'} />
                    ) : (
                        <AIBox key={index} content={message.content} />
                    )
                ))}
                {loading && <AIBox content={data.join('')} />}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex w-full bg-[#F4F4F4] rounded-lg px-3 py-2 mb-6 mt-4 border-2 border-[#F4F4F4] focus-within:border-2 focus-within:border-red-300 group">
                <input
                    placeholder="메시지 입력"
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none bg-transparent text-slate-600"
                />
                <div className="flex-grow"></div>
                <button className="flex justify-end" onClick={clickfunc} disabled={loading}>
                    {loading ? <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" /> : <TiLocationArrow className="w-7 h-7" />}
                </button>
            </div>
            <div className="flex flex-row justify-end w-full">
                <AiOutlineClear height={5} onClick={handleReset}></AiOutlineClear>
            </div>
        </div>
    );
}
