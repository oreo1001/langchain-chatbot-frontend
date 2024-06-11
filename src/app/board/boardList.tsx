import React from 'react';
import { Board } from '../types';
import Link from 'next/link';

// interface BoardListProps {
//     boards: Board[];
// }

export default function BoardList() {
    const boards: Board[] = [
        { id: 1, title: '첫 번째 게시글', content: '첫 번째 내용입니다.' },
        { id: 2, title: '두 번째 게시글', content: '두 번째 내용입니다.' },]
    return (
        <div>
            <h2>게시글 목록</h2>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>
                        <Link href={`/board/${board.id}`}>
                            {board.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
