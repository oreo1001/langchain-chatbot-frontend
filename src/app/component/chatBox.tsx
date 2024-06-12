import React, { Fragment } from 'react';


interface ChatBoxProps {
    speaker: 'human' | 'ai';
    content: string;
}

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

export function AIBox({ content }: ChatBoxProps) {
    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-line';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} px-2 py-5`}>
            <div className="w-10 h-10 rounded-xl ml-3 mr-2">
                <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
            </div>
            <div className={`pl-2 pt-1 w-[600px] rounded-lg ${messageStyle}`}>
                {renderContentWithImages(content)}
            </div>
        </div>
    );
}

export function HumanBox({ content }: ChatBoxProps) {
    const messageStyle = 'bg-[#F4F4F4] tracking-normal leading-7 whitespace-pre-line';
    const alignment = 'justify-end';

    return (
        <div className={`flex ${alignment} p-2`}>
            <div className={`rounded-lg p-3 ${messageStyle}`}>
                {content}
            </div>
        </div>
    );
}