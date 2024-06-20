import React from 'react';
import { Board } from '../types';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { getBoardList } from '@/redux/slices/boardSlice';

export default function BoardList() {
    function formatDateTime(timestamp: any) {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // 숫자가 한 자리일 경우 앞에 0을 붙여줍니다.
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    const boards = useAppSelector(getBoardList)
    return (
        <>
            {boards.map((board) => (
                <Link href={`/board/${board.id}`} className='flex flex-row py-1' key={board.id + board.dateTime}>
                    <div className='flex ml-10 w-40 justify-start text-xs items-center'>{board.id}</div>
                    <div className='flex w-52 justify-start items-center text-sm'>{board.title}</div>
                    <div className="flex h-12 text-sm w-72 mr-8 justify-start items-center overflow-hidden whitespace-nowrap">
                        <div className='truncate'>{board.content}</div>
                    </div>
                    <div className='flex text-sm w-32 justify-start items-center'>{formatDateTime(parseInt(board.dateTime))}</div>
                </Link>
            ))}
        </>
    );
};
