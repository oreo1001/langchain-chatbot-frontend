import React from 'react';
import { Board } from '../types';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { getBoardList } from '@/redux/slices/boardSlice';

// interface BoardListProps {
//     boards: Board[];
// }

export default function BoardList() {
    const boards = useAppSelector(getBoardList)
    return (
        <div>
            {boards.map((board) => (
                <Link href={`/board/${board.id}`} className='flex flex-row py-2'>
                    <div className='flex w-56 justify-center'>{board.id}</div>
                    <div className='flex w-52 justify-start'>{board.title}</div>
                    <div className="flex w-80 h-12 justify-start text-ellipsis overflow-hidden whitespace-nowrap">{board.content}</div>
                </Link>
            ))}
        </div>
    );
};
