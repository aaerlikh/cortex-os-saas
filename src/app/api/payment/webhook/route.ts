import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/yookassa';

/**
 * YooKassa webhook endpoint
 * Receives payment notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('X-Yookassa-Server-Request-Id') || '';

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle payment succeeded
    if (event.type === 'payment.succeeded') {
      const payment = event.object;

      // Update database (TODO: implement)
      // - Update user subscription status
      // - Log payment
      // - Send confirmation email

      console.log('Payment succeeded:', payment.id);
    }

    // Handle payment canceled
    if (event.type === 'payment.canceled') {
      const payment = event.object;
      console.log('Payment canceled:', payment.id);
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
