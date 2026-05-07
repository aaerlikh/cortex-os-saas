import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
// // import prisma from .../lib/prisma...

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock response for now
    return NextResponse.json({ workspaces: [] });
  } catch (error) {
    console.error('Workspaces GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await request.json();

    // Mock response for now
    const workspace = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'New Workspace'
    };

    return NextResponse.json({ workspace }, { status: 201 });
  } catch (error) {
    console.error('Workspaces POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
