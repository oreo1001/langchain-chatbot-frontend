'use client'
import { useState, useEffect } from 'react';
import { Board } from '../../types';
import { getBoardList } from '@/redux/slices/boardSlice';
import { useAppSelector } from '@/redux/hooks';
import { useParams, useRouter } from 'next/navigation';
import { AIResponse } from './AIResponse';

export default function BoardPage() {
    const params = useParams();
    const id = params.id;
    const [board, setBoard] = useState<Board | null>(null);
    const router = useRouter()
    const boardList = useAppSelector(getBoardList);

    useEffect(() => {
        //persist 스토리지로 구현
        const fetchBoard = async () => {
            const foundBoard = boardList.find((b) => b.id === Number(id));
            setBoard(foundBoard || null);
        };
        if (id) {
            fetchBoard();
        }
    }, [id, boardList]);

    if (!board) {
        return <div className='flex items-center justify-center w-screen h-screen bg-white'>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <div className='flex justify-center bg-white w-screen h-screen'>
                <div className='flex flex-col items-center'>
                    <div className='flex items-start justify-start w-full text-4xl mt-[50px]'>
                        Q&A
                    </div>
                    <div className='mt-6 border-t-2 w-[600px]'></div>
                    <div className='flex flex-row w-full my-5 px-3 h-[30px]'>
                        {board.title === '' ? '제목없음' : board.title}
                    </div>
                    <div className='flex w-full border-t-[1px] border-slate-200 py-3'></div>
                    <div className='flex w-full items-start overflow-y-auto h-[480px]'>
                        <div
                            className="flex px-3 py-2 text-gray-700 resize-none outline-none"
                        >{board.content === '' ? '제목없음' : board.content}</div>
                    </div>

                    <div className='flex w-full justify-start'>
                        <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={() => router.push('/board')}>목록</button>
                    </div>
                </div>
            </div>
            <AIResponse content={board.content} title={board.title} />
        </>
    );
};