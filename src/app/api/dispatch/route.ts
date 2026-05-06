import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, context, tier } = await request.json();

    // Determine the internal Python API endpoint
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';

    // Route the request to the internal Python LLM Dispatcher
    const response = await fetch(`${pythonApiUrl}/api/v1/dispatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Pass internal secret if needed for microservice auth
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`
      },
      body: JSON.stringify({
        query,
        context,
        tier
      })
    });

    if (!response.ok) {
      throw new Error(`Python API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Return the synthesized response back to the Next.js frontend
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Dispatch Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
