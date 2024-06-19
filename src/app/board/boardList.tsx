import React from 'react';
import { Board } from '../types';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { getBoardList } from '@/redux/slices/boardSlice';

export default function BoardList() {
    const boards = useAppSelector(getBoardList)
    return (
        <div>
            {boards.map((board) => (
                <Link href={`/board/${board.id}`} className='flex flex-row py-4' key={board.id + board.dateTime}>
                    <div className='flex ml-10 w-40 justify-start'>{board.id}</div>
                    <div className='flex w-52 justify-start'>{board.title}</div>
                    <div className="flex h-12 w-80 justify-start text-ellipsis overflow-hidden whitespace-nowrap">{board.content}</div>
                </Link>
            ))}
        </div>
    );
};
