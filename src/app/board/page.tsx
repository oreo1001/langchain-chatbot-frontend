'use client'
// /pages/index.tsx
import React, { useState } from 'react';
import BoardList from './boardList';
import { useRouter } from 'next/navigation';

const BoardHome: React.FC = () => {
    const router = useRouter();
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
                        <div className='flex flex-grow'>글목록(전체 글 : 1)</div>
                        <button className='bg-green-500 text-white px-2 py-1 rounded mr-1' onClick={() => router.push('/board/write')}>글쓰기</button>
                    </div>
                    <div className='flex flex-row border-t-[3px] border-b-[3px]'>
                        <div className='flex w-56 justify-center'>번호</div>
                        <div className='flex w-52 justify-center'>제목</div>
                        <div className='flex w-96 justify-center'>내용</div>
                    </div>
                    <BoardList />
                </div>
            </div>
        </div>
    );
};

export default BoardHome;