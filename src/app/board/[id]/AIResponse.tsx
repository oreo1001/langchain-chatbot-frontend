interface ResponseProps {
    title: string;
    content: string;
}

export function AIResponse({ content }: ResponseProps) {
    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-line';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} px-2 py-5`}>
            <div>
                {content}
            </div>
        </div>
    );
}