import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addComment, setLoading, uploadBoard } from '@/redux/slices/boardSlice';
import { useRouter } from 'next/navigation';

export default function BoardForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        autoResizeTextarea(event.target);
    };
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && event.shiftKey) {  // Shift + Enter: 줄바꿈만 적용
            return;
        } else if (event.key === 'Enter') {
            event.preventDefault(); // 줄바꿈 방지
            handleWrite(event);
        }
    };
    const handleWrite = async (event: any) => {
        event.preventDefault();

        const generatedId = Math.floor(Math.random() * 1000000);
        dispatch(setLoading(true))
        dispatch(uploadBoard({ id: generatedId, title: title, content: content, dateTime: Date.now().toString(), commentList: [] }));
        router.push(`/board/${generatedId}`);
        var inputValue = title + " " + content
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/board/comment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id: generatedId, question: inputValue, }),
            });
            const responseJson = await response.json();
            dispatch(addComment({ "boardId": generatedId, "comment": responseJson.aiResponse }))
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading(false))
        }
    };

    const autoResizeTextarea = (textarea: any) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-start justify-start w-full text-3xl mt-[50px]'>
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
                onChange={handleContentChange}
                onKeyDown={handleKeyPress}
                className="min-h-[100px] w-full px-3 py-2 text-gray-700 resize-none outline-none overflow-hidden"
                placeholder="여기에 내용을 입력하세요..."
            ></textarea>
            <div className='flex flex-row w-full pb-5'>
                <div className='flex flex-grow justify-start'>
                    <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={() => router.push('/board')}>목록</button>
                </div>
                <div className='flex justify-end'>
                    <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={handleWrite}>글쓰기</button>
                </div>
            </div>
            {/* <div className='border-t-2 w-[600px]'></div> */}
        </div>
    );
};