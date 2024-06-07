const token = process.env.TOKEN;

export async function GET(request: Request) {
    return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
    const { question } = await request.json();
    try {
        const response = await fetch('http://localhost:5000/chat/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }),
        });
        const data = await response.json();
        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
