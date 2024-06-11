import React, { useState } from 'react';
import { Board } from '../../types';
import { useAppDispatch } from '@/redux/hooks';

interface BoardFormProps {
    addBoard: (board: Board) => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ addBoard }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    // const handleInputChange = (event: any) => {
    //     setInputValue(event.target.value);
    // };

    const handleSearch = async (event: any) => {
        event.preventDefault();
        if (loading) return; // 이미 로딩 중일 때는 중복 클릭 방지

        // dispatch(addMessageToList({ title: inputValue, speaker: 'human' }));
        // setInputValue(''); // 메시지 전송 후 입력 필드 초기화
        setLoading(true); // 로딩 상태로 설정

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ question: "dd" }),
            });
            const responseJson = await response.json();
            console.log(responseJson);
            const chatMessages = responseJson.data.messages;
            // dispatch(addMessageToList(chatMessages[chatMessages.length - 1]));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='mt-10 border-t-2 w-[900px]'></div>
            <div className='flex flex-row'>
                <div className='mt-5'>제목</div>
                <input
                    placeholder="메시지 입력"
                    type="text"
                    // value={inputValue}
                    // onChange={handleTitle}
                    className="w-full focus:outline-none bg-transparent text-slate-600"
                />
            </div>
            <textarea
                // id="content"
                // name="content"
                // onChange={handleContent}
                onKeyDown={handleKeyPress}
                rows={10}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline resize-none"
                placeholder="여기에 내용을 입력하세요..."
            ></textarea>
        </div>
    );
};

export default BoardForm;