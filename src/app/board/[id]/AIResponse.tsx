interface ResponseProps {
    title: string;
    content: string;
}

export function AIResponse({ content }: ResponseProps) {
    const messageStyle = 'bg-white tracking-normal leading-7 whitespace-pre-line';
    const alignment = 'justify-start';

    return (
        <div className={`flex ${alignment} mt-8 w-full h-full rounded border-2 border-purple-300`}>
            <div className="px-2 py-5">
                {content}
            </div>
        </div>
    );
}