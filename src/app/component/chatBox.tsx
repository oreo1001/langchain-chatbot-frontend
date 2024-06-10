import React from 'react';

interface ChatBoxProps {
    speaker: 'human' | 'ai';
    content: string;
}

export function AIBox({ content }: ChatBoxProps) {
    const messageStyle = 'bg-white';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} p-2`}>
            <div className="w-10 h-10 rounded-xl ml-3 mr-2">
                <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
            </div>
            <div className={`pl-2 w-[600px] rounded-lg ${messageStyle} tracking-normal leading-8`}>
                {content}
            </div>
        </div>
    );
}

export function HumanBox({ content }: ChatBoxProps) {
    const messageStyle = 'bg-[#F4F4F4]';
    const alignment = 'justify-end';

    return (
        <div className={`flex ${alignment} p-2`}>
            <div className={`rounded-lg p-3 ${messageStyle} tracking-wide line-clamp-2`}>
                {content}
            </div>
        </div>
    );
}