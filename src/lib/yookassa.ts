// YooKassa Payment Integration Helper
// Документация: https://yookassa.ru/developers

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY || '';
const API_BASE_URL = 'https://api.yookassa.ru/v3';
const PAYMENT_MODE = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'production'; // 'mock' | 'production'

// Mock payment ID generator
function generateMockPaymentId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

interface CreatePaymentParams {
  amount: number;
  currency: string;
  planId: string;
  userEmail: string;
  period: 'monthly' | 'annual';
  paymentMethod: 'card' | 'bank';
}

interface YooKassaPayment {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled' | 'waiting_for_capture';
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url?: string;
  };
  created_at: string;
  metadata: Record<string, any>;
}

/**
 * Create payment session with YooKassa
 */
export async function createPaymentSession(
  params: CreatePaymentParams
): Promise<YooKassaPayment> {
  // MOCK MODE - for testing without real payments
  if (PAYMENT_MODE === 'mock') {
    const mockPaymentId = generateMockPaymentId();
    const successUrl = new URL('/checkout/success', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    successUrl.searchParams.set('paymentId', mockPaymentId);

    return {
      id: mockPaymentId,
      status: 'succeeded',
      paid: true,
      amount: {
        value: (params.amount / 100).toFixed(2),
        currency: params.currency || 'RUB',
      },
      confirmation: {
        type: 'redirect',
        confirmation_url: successUrl.toString(),
      },
      created_at: new Date().toISOString(),
      metadata: {
        plan_id: params.planId,
        user_email: params.userEmail,
        billing_period: params.period,
        order_type: 'subscription',
        mock: true,
      },
    };
  }

  // PRODUCTION MODE - real YooKassa API
  if (!YOOKASSA_SHOP_ID || !YOOKASSA_SECRET_KEY) {
    throw new Error('YooKassa credentials not configured');
  }

  const auth = Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString(
    'base64'
  );

  const requestBody = {
    amount: {
      value: (params.amount / 100).toFixed(2), // Convert to decimal
      currency: params.currency || 'RUB',
    },
    payment_method_data: {
      type: params.paymentMethod === 'card' ? 'bank_card' : 'bank_transfer',
    },
    confirmation: {
      type: 'redirect',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    },
    capture: true,
    metadata: {
      plan_id: params.planId,
      user_email: params.userEmail,
      billing_period: params.period,
      order_type: 'subscription',
    },
    description: `Cortex OS ${params.planId} subscription (${params.period})`,
  };

  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Idempotence-Key': `${params.userEmail}-${Date.now()}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('YooKassa API error:', error);
    throw new Error(`YooKassa payment creation failed: ${response.statusText}`);
  }

  const payment = (await response.json()) as YooKassaPayment;
  return payment;
}

/**
 * Get payment details
 */
export async function getPayment(paymentId: string): Promise<YooKassaPayment> {
  // MOCK MODE - return fake payment data
  if (PAYMENT_MODE === 'mock' || paymentId.startsWith('test_')) {
    return {
      id: paymentId,
      status: 'succeeded',
      paid: true,
      amount: {
        value: '2900.00',
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
      },
      created_at: new Date().toISOString(),
      metadata: {
        mock: true,
      },
    };
  }

  // PRODUCTION MODE - real YooKassa API
  const auth = Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString(
    'base64'
  );

  const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch payment: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Verify webhook signature from YooKassa
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', YOOKASSA_SECRET_KEY)
    .update(body)
    .digest('base64');

  return hash === signature;
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  const auth = Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString(
    'base64'
  );

  const response = await fetch(
    `${API_BASE_URL}/subscriptions/${subscriptionId}/cancel`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to cancel subscription: ${response.statusText}`);
  }
}

export default {
  createPaymentSession,
  getPayment,
  verifyWebhookSignature,
  cancelSubscription,
};
