'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMessageToList, getMessageList, getPrevious, setPrevious } from '@/redux/slices/chatSlice';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClear, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiLocationArrow } from 'react-icons/ti';
import { AIBox, HumanBox } from './chatBox';
import { RiChatSmile2Line } from 'react-icons/ri';

export default function ChatMain() {
    interface ChatMessage {
        speaker: 'human' | 'ai'
        content: string
    }
    // const messageList = useAppSelector(getMessageList);

    const [messageList, setMessageList] = useState<ChatMessage[]>([]);
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [streaming, setStreaming] = useState(false);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState('');
    useEffect(() => {
        // 처음 마운트될 때 세션 ID 생성
        if (!sessionId) {
            const newSessionId = generateSessionId();
            setSessionId(newSessionId);
        }
    }, [sessionId]);


    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    function generateSessionId() {
        let sessionId = '';
        for (let i = 0; i < 8; i++) {
            sessionId += getRandomInt(10); // 0에서 9 사이의 숫자 추가
        }
        return sessionId
    }

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
        const sessionId = generateSessionId()
        setSessionId(sessionId)
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            clickfunc(event);
        }
    };

    const clickfunc = async (event: React.FormEvent) => {
        event.preventDefault();

        if (streaming) return;
        setLoading(true);
        setStreaming(true);
        const currentInputValue = inputValue;
        messageList.push({ content: currentInputValue, speaker: 'human' })
        setInputValue(''); // 메시지 전송 후 입력 필드 초기화

        try {
            console.log(sessionId)
            const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/stream/ask', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ question: currentInputValue, session_id: sessionId }),
            });
            const newEventSource = new EventSource(process.env.NEXT_PUBLIC_API_SERVER + '/stream/test');

            newEventSource.onmessage = (messageEvent) => {
                setLoading(false)
                const updatedMessage = messageEvent.data.replace(/🖐️/g, '\n');
                setData(prevData => [...prevData, updatedMessage]);
                if (messageEvent.data.includes('\u200C')) { // 마지막 메시지가 'Done'을 포함하면
                    setData(prevData => {
                        const completeMessage = prevData.join('');
                        messageList.push({ content: completeMessage, speaker: 'ai' })
                        return [];
                    });
                    newEventSource.close(); // EventSource 닫기
                    setStreaming(false);
                    setData([]);
                }
            };

            newEventSource.onerror = (error) => {
                console.error('EventSource error:', error);
                newEventSource.close();
                setStreaming(false);
            };
        } catch (error) {
            console.error('Error:', error);
            setStreaming(false);
        }
    };
    return (
        <>
            <div className='w-full flex flex-row justify-end'>
                <div className="hover:bg-[#73EAA8] items-center border-2 border-slate-200 rounded-lg flex w-[160px] mb-5 cursor-pointer" onClick={handleReset}>
                    <div className='px-2 text-sm'>새로운 세션 열기</div>
                    <RiChatSmile2Line className='h-8 w-8'></RiChatSmile2Line>
                </div>
            </div>
            <div className="flex flex-col h-screen overflow-y-auto">

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
                <div className='flex flex-grow flex-col'>
                    {messageList.map((message: ChatMessage, index: number) => (
                        message.speaker === 'human' ? (
                            <HumanBox key={index} content={message.content} speaker={'human'} />
                        ) : (
                            <AIBox loading={false} key={index} content={message.content} />
                        )
                    ))}
                    {streaming && <AIBox loading={loading} content={data.join('')} />}
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
                    <button className="flex justify-end" onClick={clickfunc} disabled={streaming}>
                        {streaming ? <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" /> : <TiLocationArrow className="w-7 h-7" />}
                    </button>
                </div>
            </div>
        </>
    );
}
