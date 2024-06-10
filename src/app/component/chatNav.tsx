'use client'

import { useAppDispatch } from "@/redux/hooks";
import { reset } from "@/redux/slices/chatSlice";
import { AiOutlineClear } from "react-icons/ai";

export default function ChatNav() {
    const dispatch = useAppDispatch()
    const handleReset = () => {
        dispatch(reset());
    };

    return (
        <div className="flex flex-row justify-end w-full">
            <AiOutlineClear height={5} onClick={handleReset}></AiOutlineClear>
        </div>
    );
}