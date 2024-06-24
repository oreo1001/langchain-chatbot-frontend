export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const { question } = await request.json();

    return new Response(new ReadableStream({
        async start(controller) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/stream/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: question, session_id: '123' }),
                });
                if (!response.body) {
                    throw new Error('Response body is null');
                }
                console.log(response)
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    controller.enqueue(`data: ${chunk}\n\n`);
                }
                controller.enqueue('data: Done\n\n');
                controller.close();
            } catch (error) {
                console.error('Error:', error);
                controller.enqueue('data: Error occurred\n\n');
                controller.close();
            }
        }
    }), {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        }
    });
}
