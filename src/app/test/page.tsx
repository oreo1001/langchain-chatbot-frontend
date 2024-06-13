'use client'

import { useEffect, useState } from 'react';

const Test = () => {
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    function getRandomString(max: any) {
        return String(Math.floor(Math.random() * max));
    }

    const clickfunc = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/stream/ask', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ question: inputValue, session_id: getRandomString(4) }),
        });
        console.log(response)
        const newEventSource = new EventSource('http://localhost:5000/stream/test');
        setEventSource(newEventSource);

        const resetTimeout = () => {
            if (timeoutId) clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
                newEventSource.close();
                console.log('EventSource closed due to inactivity');
            }, 10000); // 20초 동안 이벤트가 발생하지 않으면 EventSource를 닫습니다.
            setTimeoutId(newTimeoutId);
        };

        newEventSource.onmessage = (event) => {
            // resetTimeout(); // 이벤트 발생 시 타이머를 리셋합니다.
            setData(prevData => {
                const updatedData = [...prevData, event.data];
                const lastMessage = updatedData[updatedData.length - 1];
                if (lastMessage.endsWith('Done')) { // 마지막 4글자가 'Done'이면
                    newEventSource.close(); // EventSource 닫기
                    console.log('EventSource closed because of "Done" message');
                }
                return updatedData;
            });
        };
    }
    // useEffect(() => {
    //     return () => {
    //         if (eventSource) eventSource.close();
    //     };
    // }, [eventSource]);

    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-line';
    return (
        <div className='bg-white h-screen w-screen flex flex-col items-center justify-center'>
            <input
                placeholder="메시지 입력"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                // onKeyDown={handleKeyPress}
                className="w-full focus:outline-none bg-transparent text-slate-600"
            />
            <button onClick={clickfunc}>ddd</button>
            <div className={`flex justify-start px-2 py-5`}>
                <div className="w-10 h-10 rounded-xl ml-3 mr-2">
                    <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
                </div>
                <div className={`pl-2 pt-1 w-[600px] rounded-lg ${messageStyle}`}>
                    {/* {renderContentWithImages(content)} */}
                    {data}
                </div>
            </div>
        </div>
    );
};

export default Test;