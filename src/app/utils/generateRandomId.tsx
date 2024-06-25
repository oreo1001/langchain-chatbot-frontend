// utils/generateRandomId.ts

// 랜덤한 알파벳 문자열 생성
const generateRandomAlphabet = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// 랜덤한 숫자 문자열 생성
const generateRandomNumber = (length: number): string => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// 랜덤 ID 생성
export const generateRandomId = (): string => {
    const alphabetPart = generateRandomAlphabet(4);
    const numberPart = generateRandomNumber(4);
    return alphabetPart + numberPart;
};