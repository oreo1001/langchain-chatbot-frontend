'use client'

import { addMessageToList } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

export default function InputBox() {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ question: inputValue }),
            });
            const responseJson = await response.json();
            const chatMessages = responseJson.data.messages

            addMessageToList(chatMessages[chatMessages.length - 1].content)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <div className="flex w-full bg-gray-200 rounded-lg px-3 py-2 mb-10 border-2 border-gray-200 focus-within:border-2 focus-within:border-red-500 group">
                <input
                    placeholder="Your message"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full focus:outline-none bg-transparent text-slate-600"
                />
                <div className="flex-grow"></div>
                <div className="flex justify-end" onClick={handleSearch}><TiLocationArrow className="w-7 h-7"></TiLocationArrow></div>
            </div>
        </>
    )
}