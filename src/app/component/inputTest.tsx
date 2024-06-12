'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessageToList } from '@/redux/slices/chatSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiLocationArrow } from 'react-icons/ti';

const socket = io('http://localhost:5000'); // WebSocket server address

const InputTest: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('response', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => {
            socket.off('response');
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (loading) return;

        dispatch(addMessageToList({ content: inputValue, speaker: 'human' }));
        setInputValue('');
        setLoading(true);

        // Emit WebSocket message
        socket.emit('message', { question: inputValue });

        // Make HTTP POST request
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseJson = await response.json();
            console.log(responseJson);
            // Process HTTP response here if needed
        } catch (error) {
            console.error('HTTP request failed:', error);
        }

        setLoading(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

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
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{renderContentWithImages(message)}</div>
                ))}
            </div>
        </div>
    );
};

const renderContentWithImages = (content: string) => {
    const regex = /https:\/\/[^ ]+\.(?:png|jpg|jpeg|gif)/g;
    const parts = content.split(regex);
    const matches = content.match(regex);

    if (!matches) {
        return <p>{content}</p>;
    }

    return (
        <div>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    <span>{part}</span>
                    {matches[index] && <img src={matches[index]} alt={`Image ${index}`} className="my-4" />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default InputTest;