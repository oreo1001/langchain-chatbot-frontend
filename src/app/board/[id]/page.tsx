'use client'
import { useState, useEffect } from 'react';
import { Board } from '../../types';
import { useParams } from 'next/navigation';

const BoardPage = () => {
    const params = useParams();
    const id = params.id;
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        // 게시글 목록을 로컬 스토리지나 서버에서 불러오는 로직을 구현할 수 있습니다.
        // 여기서는 간단히 예제 데이터를 사용합니다.
        const fetchBoard = async () => {
            // 예제 데이터
            const boardList: Board[] = [
                { id: 1, title: '첫 번째 게시글', content: '첫 번째 내용입니다.' },
                { id: 2, title: '두 번째 게시글', content: '두 번째 내용입니다.' },
            ];
            const foundBoard = boardList.find((b) => b.id === Number(id));
            setBoard(foundBoard || null);
        };
        if (id) {
            fetchBoard();
        }
    }, [id]);

    if (!board) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
        </div>
    );
};

export default BoardPage;