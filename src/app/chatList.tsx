'use client'

import { useState } from "react";

export default function ChatList() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === '복무 제 4조에 대해서 알려줘') {
            setResult('여기에 복무 제 4조에 대한 내용을 표시합니다.');
        } else {
            setResult('');
        }
    };
    return (
        <>
            <div className="flex flex-row items-center bg-slate-100 px-2 rounded-lg">
                <div className="w-10 h-10 bg-red-300 rounded-xl"></div>
                <div className="py-3 pl-2">복무 제 4조에 대해서 알려줘</div>
            </div>
        </>
    )
}