import React from 'react';
import Lottie from 'react-lottie-player';
import loadingJson2 from '../../../public/assets/loading2.json'


interface HumanBoxProps {
    speaker: 'human' | 'ai';
    content: string;
}

const renderContentWithImages = (content: string) => {
    const regex = /(https:\/\/[^ \n]+\.(?:png|jpg|jpeg|gif))/g;
    const parts = content.split(regex);

    return (
        <>
            {parts.map((part, index) => {
                // 이미지 URL일 경우 <img> 태그로 렌더링
                if (regex.test(part)) {
                    return <img key={index} src={part} alt={`Image ${index}`} className="my-4" />;
                }
                // 이미지 URL이 아닐 경우 텍스트로 렌더링
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </>
    );
};

//나중에 이미지만 모아서 보여주게 하고 속도 측정

interface AIBoxProps {
    content: string;
    loading: boolean;
}

export function AIBox({ content, loading }: AIBoxProps) {
    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-wrap';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} flex-col px-2 py-5`}>
            <div className={`flex ${alignment} py-2`}>
                <div className="w-10 h-10 rounded-xl ml-3 mr-2">
                    <img src="/assets/sapie.png" alt="AI" className="w-full h-full rounded-xl" />
                </div>
                <span className={`pl-2 pt-1 w-[600px] rounded-lg ${messageStyle}`}>
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Lottie
                                loop
                                animationData={loadingJson2}
                                play
                                style={{ width: 400, height: 300 }}
                            ></Lottie>
                        </div>
                    ) : (
                        renderContentWithImages(content)
                    )}
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