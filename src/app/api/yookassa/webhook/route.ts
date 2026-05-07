import { NextResponse } from 'next/server';
// import prisma from .../lib/prisma...

export async function POST(request: Request) {
  try {
    // YooKassa sends a JSON body with the event details
    const body = await request.json();

    const { event, object: payment } = body;

    // We only care about successful payments for granting subscriptions
    if (event === 'payment.succeeded') {
      const { id: yookassaId, metadata } = payment;
      
      if (!metadata || !metadata.userId || !metadata.planId) {
         console.error('Webhook Error: Missing metadata');
         return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      // 1. Update the transaction status
      await prisma.transaction.update({
        where: { yookassaId },
        data: { status: 'SUCCEEDED', paymentMethod: payment.payment_method?.type }
      });

      // 2. Define token logic based on plan
      let newTokens = 0;
      const plan = metadata.planId.toUpperCase();
      if (plan === 'STARTER') newTokens = 1000;
      if (plan === 'PROFESSIONAL') newTokens = 5000;
      if (plan === 'BUSINESS') newTokens = 100000;

      // 3. Upsert the User's Subscription
      await prisma.subscription.upsert({
        where: { userId: metadata.userId },
        update: {
          tier: plan,
          status: 'ACTIVE',
          yookassaPaymentId: yookassaId,
          tokenBalance: { increment: newTokens },
          currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)) // +1 month
        },
        create: {
          userId: metadata.userId,
          tier: plan,
          status: 'ACTIVE',
          yookassaPaymentId: yookassaId,
          tokenBalance: newTokens,
          currentPeriodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      });

      console.log(`Successfully processed payment ${yookassaId} for user ${metadata.userId}`);
    }

    // Always return 200 OK to YooKassa so they stop retrying
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
