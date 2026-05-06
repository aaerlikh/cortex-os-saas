import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const workspaces = await prisma.workspace.findMany({
      where: { userId: user.id },
      include: {
        threads: {
          select: { id: true, title: true, agentType: true, updatedAt: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ workspaces });
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
    
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const workspace = await prisma.workspace.create({
      data: {
        userId: user.id,
        name: name || 'New Workspace'
      }
    });

    return NextResponse.json({ workspace }, { status: 201 });
  } catch (error) {
    console.error('Workspaces POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
