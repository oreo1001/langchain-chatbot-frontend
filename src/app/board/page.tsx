'use client'
// /pages/index.tsx
import React, { useState } from 'react';
import BoardList from './boardList';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { countBoardList } from '@/redux/slices/boardSlice';

const BoardHome: React.FC = () => {
    const router = useRouter();
    const countBoards = useAppSelector(countBoardList)
    return (
        <div className='flex justify-center bg-white w-screen h-screen'>
            <div className='flex flex-col items-center w-[1000px]'>
                <div className='flex flex-row w-full items-center pt-5'>
                    <img src="/assets/sapie.png" alt="AI" className="w-12 h-12 rounded-xl ml-5" />
                    <div className='flex flex-grow text-xl ml-3'>Sapie</div>
                    <div className='flex w-20 justify-end pr-3'>게시판</div>
                </div>
                <div className='flex flex-col w-[900px] pt-[200px]'>
                    <div className='flex flex-row items-center mb-1'>
                        <div className='flex flex-grow text font-medium'>글목록(전체 글 : {countBoards})</div>
                        <button className='bg-green-500 text-white px-2 py-1 rounded mr-1' onClick={() => router.push('/board/write')}>글쓰기</button>
                    </div>
                    <div className='flex flex-row border-t-[3px] border-b-[3px] py-3'>
                        <div className='flex ml-10 w-40 justify-start'>번호</div>
                        <div className='flex w-52 justify-start'>제목</div>
                        <div className='flex w-80 justify-start'>내용</div>
                        <div className='flex w-32 justify-start'>시간</div>
                    </div>
                    <div className='pt-3'>
                        <BoardList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardHome;