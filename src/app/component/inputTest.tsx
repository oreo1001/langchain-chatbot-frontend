'use client'

import { addMessageToList } from "@/redux/slices/chatSlice";
import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch } from '@/redux/hooks';
import { eventNames } from "process";

export default function InputBox() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [data, setData] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) return; // 이미 로딩 중일 때는 중복 클릭 방지

        dispatch(addMessageToList({ content: inputValue, speaker: 'human' }));
        setInputValue(''); // 메시지 전송 후 입력 필드 초기화
        setLoading(true); // 로딩 상태로 설정

        try {
            const response = await fetch('http://localhost:5000/stream/messages', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ question: inputValue, session_id: '123' }),
            });
            // const responseJson = await response.json();
            // const chatMessages = responseJson.data.messages;
            // dispatch(addMessageToList(chatMessages[chatMessages.length - 1]));

            // 기존 EventSource 닫기
            if (eventSource) {
                eventSource.close();
            }

            // 새로운 EventSource 열기
            const newEventSource = new EventSource('http://localhost:5000/stream/messages');
            newEventSource.onmessage = function (event) {
                const newMessage = event.data;
                console.log(newMessage)
                dispatch(addMessageToList({ content: newMessage, speaker: 'ai' }));
                setData(event.data);
            };
            newEventSource.onerror = function (error) {
                console.error('EventSource error:', error);
                newEventSource.close();
            };
            setEventSource(newEventSource);
            console.log(newEventSource)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    // 컴포넌트 언마운트 시 EventSource 닫기
    useEffect(() => {
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [eventSource]);

    return (
        <div className="flex w-full bg-[#F4F4F4] rounded-lg px-3 py-2 mb-6 mt-4 border-2 border-[#F4F4F4] focus-within:border-2 focus-within:border-red-300 group">
            <input
                placeholder="메시지 입력"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="w-full focus:outline-none bg-transparent text-slate-600"
            />
            <div className="flex-grow"></div>
            <button className="flex justify-end" onClick={handleSearch} disabled={loading}>
                {loading ? <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" /> : <TiLocationArrow className="w-7 h-7" />}
            </button>
            <p>{data}</p>
        </div>
    );
}
