import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { uploadBoard } from '@/redux/slices/boardSlice';
import { useRouter } from 'next/navigation';

export default function BoardForm() {
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };
    //console.log(typeof (Math.floor(Math.random() * 1000000)))

    const handleWrite = async (event: any) => {
        event.preventDefault();
        if (loading) return; // 이미 로딩 중일 때는 중복 클릭 방지

        const generatedId = Math.floor(Math.random() * 1000000);
        setId(generatedId);
        dispatch(uploadBoard({ id: generatedId, title: title, content: content }));
        router.push(`/board/${generatedId}`);
        // setLoading(true); // 로딩 상태로 설정
        // try {
        //     const response = await fetch('/api/chat', {
        //         method: 'POST',
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //         body: JSON.stringify({ question: content }),
        //     });
        //     const responseJson = await response.json();
        //     console.log(responseJson);
        //     // const chatMessages = responseJson.data.messages;
        //     // dispatch(addMessageToList(chatMessages[chatMessages.length - 1]));
        // } catch (error) {
        //     console.error('Error:', error);
        // } finally {
        //     setLoading(false); // 로딩 상태 해제
        // }
    };
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleWrite(event);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-start justify-start w-full text-4xl mt-[50px]'>
                Q&A
            </div>

            <div className='mt-6 border-t-2 w-[600px]'></div>

            <div className='flex flex-row w-full my-5'>
                {/* <div className='w-16 flex items-start justify-center'>제목</div> */}
                <input
                    placeholder="제목 입력"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="ml-3 flex focus:outline-none bg-transparent"
                />
            </div>
            <div className='flex w-full border-t-[1px] border-slate-200 py-3'></div>
            <textarea
                id="content"
                name="content"
                value={content}
                rows={20}
                onChange={handleContentChange}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 text-gray-700 resize-none outline-none"
                placeholder="여기에 내용을 입력하세요..."
            ></textarea>
            <div className='flex flex-row w-full'>
                <div className='flex flex-grow justify-start'>
                    <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={() => router.push('/board')}>목록</button>
                </div>
                <div className='flex justify-end'>
                    <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={handleWrite} disabled={loading}>글쓰기</button>
                </div>
            </div>
        </div>
    );
};