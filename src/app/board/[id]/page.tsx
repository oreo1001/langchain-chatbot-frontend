'use client'
import { useState, useEffect, useRef } from 'react';
import { myComment } from '../../types';
import { addComment, getTempQuestion, makeGetBoardById } from '@/redux/slices/boardSlice';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { CommentAIBox } from '@/app/component/chatBox';
import { useAppDispatch } from '@/redux/hooks';

export default function BoardPage() {
    const params = useParams();
    const id = params.id;
    const myBoardId = (typeof id === 'string') ? id : id[0];
    const router = useRouter()
    const getBoardById = makeGetBoardById();
    const thisBoard = useSelector((state: RootState) => getBoardById(state, Number(id)));
    const [commentLoading, setCommentLoading] = useState<boolean>(true);

    const [commentList, setCommentList] = useState<myComment[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputValue = useSelector(getTempQuestion)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (thisBoard) {
            setCommentList(thisBoard.commentList);
            if (thisBoard.commentList.length > 0) {
                setCommentLoading(false)
            } else {
                ifCommentEmptyGetAPI();
            }
        }
    }, [thisBoard, commentList]);

    const ifCommentEmptyGetAPI = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/board/comment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id: myBoardId, question: inputValue, }),
            });
            const responseJson = await response.json();
            dispatch(addComment({ "boardId": parseInt(myBoardId), "comment": responseJson.aiResponse }))
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setCommentLoading(false)
        }
    }
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [commentList]);

    if (!thisBoard) {
        return <div className='flex items-center justify-center w-screen h-screen bg-white'>게시글을 찾을 수 없습니다.</div>;
    }

    console.log(commentLoading)
    return (
        <div className='flex justify-center bg-white w-screen h-full min-h-screen'>
            <div className='w-[600px] flex flex-col items-center'>
                <div className='flex items-start justify-start w-full text-3xl mt-[50px]'>
                    Q&A
                </div>
                <div className='mt-6 border-t-2 w-full'></div>
                <div className='flex flex-row w-full my-5 px-3 h-[30px]'>
                    {thisBoard.title === '' ? '제목없음' : thisBoard.title}
                </div>
                <div className='flex w-full border-t-[1px] border-slate-200 py-3'></div>
                <div className='flex w-full items-start overflow-y-auto min-h-[100px]'>
                    <div className="flex-grow px-3 py-2 text-gray-700 resize-none outline-none">
                        {thisBoard.content === '' ? '제목없음' : thisBoard.content}
                    </div>
                </div>
                <div className='flex w-full justify-start'>
                    <button className='px-3 py-2 border-2 rounded border-slate-200' onClick={() => router.push('/board')}>목록</button>
                </div>
                {commentList.map((comment, index) => (
                    index === 0 ? (
                        <div key={comment.commentId} className='mx-8'>
                            <CommentAIBox loading={commentLoading} content={comment.content}></CommentAIBox>
                        </div>
                    ) : (
                        <div key={comment.commentId} className='px-8'>
                            {/* {comment.content} */}
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};