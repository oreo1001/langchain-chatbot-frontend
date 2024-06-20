// /types/index.ts
export interface Board {
    id: number;
    title: string;
    content: string;
    dateTime: string;
    commentList: myComment[]
}

export interface myComment {
    commentId: number;
    content: string;
}