import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const messages = await prisma.message.findMany({
      where: { threadId: params.threadId },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Messages GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { threadId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content } = await request.json();
    if (!content) return NextResponse.json({ error: 'Content is required' }, { status: 400 });

    // 1. Save User Message
    const userMessage = await prisma.message.create({
      data: {
        threadId: params.threadId,
        role: 'USER',
        content: content
      }
    });

    // 2. Call Python FastAPI LLM Router
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const llmResponse = await fetch(`${pythonApiUrl}/api/v1/dispatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`
      },
      body: JSON.stringify({
        query: content,
        context: { workspace_id: params.threadId }
      })
    });

    if (!llmResponse.ok) {
      throw new Error(`LLM API Error: ${llmResponse.statusText}`);
    }

    const llmData = await llmResponse.json();
    const agentReply = llmData.data.response;
    const modelUsed = llmData.data.router_decision?.target || 'unknown';

    // 3. Save Agent Message
    const agentMessage = await prisma.message.create({
      data: {
        threadId: params.threadId,
        role: 'AGENT',
        content: agentReply,
        modelUsed: modelUsed
      }
    });

    // Return both messages so the UI updates instantly
    return NextResponse.json({ userMessage, agentMessage }, { status: 201 });

  } catch (error) {
    console.error('Messages POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
