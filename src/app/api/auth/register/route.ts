import { NextRequest, NextResponse } from 'next/server';
import { writeFile, appendFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

const REGISTRATIONS_LOG = join(process.cwd(), 'data', 'registrations.json');

interface RegistrationData {
  id: string;
  email: string;
  registeredAt: string;
  ipAddress: string;
  userAgent: string;
  emailVerified: boolean;
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await import('fs').then(fs => {
      const dir = join(process.cwd(), 'data');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    await ensureDataDir();

    // Read existing registrations
    let registrations: RegistrationData[] = [];
    try {
      const fs = await import('fs');
      if (fs.existsSync(REGISTRATIONS_LOG)) {
        const data = await fs.promises.readFile(REGISTRATIONS_LOG, 'utf-8');
        registrations = JSON.parse(data);
      }
    } catch (error) {
      console.log('Creating new registrations log');
    }

    // Check if email already registered
    if (registrations.some(r => r.email === email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create new registration record
    const newRegistration: RegistrationData = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      registeredAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      emailVerified: false,
    };

    // Append to registrations log
    registrations.push(newRegistration);
    await appendFile(REGISTRATIONS_LOG, JSON.stringify(newRegistration) + '\n', 'utf-8');

    // Log to console for visibility
    console.log('[REGISTRATION]', JSON.stringify(newRegistration));

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        userId: newRegistration.id,
        email: newRegistration.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[REGISTRATION ERROR]', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to view registrations (admin only - for now, publicly accessible for testing)
export async function GET(request: NextRequest) {
  try {
    const fs = await import('fs');
    if (!fs.existsSync(REGISTRATIONS_LOG)) {
      return NextResponse.json({ registrations: [] });
    }

    const data = await fs.promises.readFile(REGISTRATIONS_LOG, 'utf-8');
    const registrations = data
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    return NextResponse.json({
      totalRegistrations: registrations.length,
      registrations: registrations.sort(
        (a: RegistrationData, b: RegistrationData) =>
          new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
      ),
    });
  } catch (error) {
    console.error('[GET REGISTRATIONS ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
