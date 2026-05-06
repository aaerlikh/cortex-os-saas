import { NextRequest, NextResponse } from 'next/server';
import { createPaymentSession } from '@/lib/yookassa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, period, price, paymentMethod, userEmail } = body;

    if (!planId || !period || !price || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payment session with YooKassa
    const payment = await createPaymentSession({
      amount: price,
      currency: 'RUB',
      planId,
      userEmail,
      period,
      paymentMethod,
    });

    // Return payment confirmation URL
    return NextResponse.json({
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
      status: payment.status,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}
