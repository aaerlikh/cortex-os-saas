import { NextRequest, NextResponse } from 'next/server';
import { getPayment } from '@/lib/yookassa';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Get payment details from YooKassa
    const payment = await getPayment(paymentId);

    // Save to database (TODO: implement database integration)
    // await savePaymentToDatabase(payment, userId);

    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      paid: payment.paid,
      amount: payment.amount,
      planId: payment.metadata?.plan_id,
      billingPeriod: payment.metadata?.billing_period,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
