import React from 'react';


interface HumanBoxProps {
    speaker: 'human' | 'ai';
    content: string;
}

const renderContentWithImages = (content: string) => {
    const regex = /https:\/\/[^ ]+\.(?:png|jpg|jpeg|gif)/g;
    const parts = content.split(regex);
    const matches = content.match(regex);

    return (
        <>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                    {matches && matches[index] && (
                        <img key={index} src={matches[index]} alt={`Image ${index}`} className="my-4" />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
//나중에 이미지만 모아서 보여주게 하고 속도 측정

interface ChatBoxProps {
    data: string[];
}
interface AIBoxProps{
    content:string;
}

export function AIBox( {content} : AIBoxProps) {
    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-wrap';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} flex-col px-2 py-5`}>
            <div className={`flex ${alignment} py-2`}>
                <div className="w-10 h-10 rounded-xl ml-3 mr-2">
                    <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
                </div>
                <span className={`pl-2 pt-1 w-[600px] rounded-lg ${messageStyle}`}>
                    {renderContentWithImages(content)}
                </span>
            </div>
        </div>
    );
}

export function HumanBox({ content }: HumanBoxProps) {
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
export function ChatBox({ content }: HumanBoxProps) {
    const messageStyle = 'bg-[#F4F4F4] tracking-normal leading-7 whitespace-pre-wrap';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} p-2`}>
            <div className={`rounded-lg p-3 ${messageStyle}`}>
                {content}
            </div>
        </div>
    );
}