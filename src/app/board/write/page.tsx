'use client'
// /pages/index.tsx
import React, { useState } from 'react';
import { Board } from '../../types';
// import BoardList from './boardList';
import BoardForm from './boardForm';

const BoardHome: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);

    const addBoard = (board: Board) => {
        setBoards([...boards, board]);
    };

    return (
        <div className='flex justify-center bg-white w-screen h-screen'>
            <BoardForm addBoard={addBoard} />
        </div>
    );
};

export default BoardHome;