'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const planDetails: Record<string, any> = {
  pro: {
    name: 'Pro',
    monthlyPrice: 2900,
    annualPrice: 29580,
    features: ['1,000 queries/month', 'Multi-LLM access', 'Priority support'],
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const planId = searchParams.get('plan') || 'pro';
  const period = (searchParams.get('period') || 'monthly') as 'monthly' | 'annual';
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = planDetails[planId];
  const price = period === 'annual' ? plan.annualPrice : plan.monthlyPrice;

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  const handlePayment = async () => {
    if (!session?.user?.email) return;

    setIsProcessing(true);
    try {
      // Call backend to create payment session with Yookassa
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.email}`,
        },
        body: JSON.stringify({
          planId,
          period,
          price,
          paymentMethod,
          userEmail: session.user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const data = await response.json();

      // Redirect to Yookassa payment page
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35]">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={40} />
          <p className="text-secondary">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Pricing
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Order Summary */}
          <div className="glass-lg p-8 rounded-2xl h-fit">
            <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <p className="font-semibold text-primary">{plan.name} Plan</p>
                  <p className="text-sm text-secondary">{period === 'annual' ? 'Annual billing' : 'Monthly billing'}</p>
                </div>
                <p className="text-xl font-bold text-primary">₽{price}</p>
              </div>

              {period === 'annual' && (
                <div className="flex justify-between items-center text-green-400 text-sm">
                  <span>Annual discount (15%)</span>
                  <span>-₽{plan.monthlyPrice * 12 - plan.annualPrice}</span>
                </div>
              )}

              <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-lg p-4">
                <p className="text-sm text-secondary mb-2">14-day free trial included</p>
                <p className="text-xs text-tertiary">
                  Your subscription will start after the trial ends. Cancel anytime.
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-8 border-t border-white/10 pt-6">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>₽{price}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Tax (included)</span>
                <span>₽0</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-lg border-t border-white/10 pt-4 mt-4">
                <span>Total</span>
                <span>₽{price}</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-primary mb-4">What's included:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-secondary text-sm">
                    <Check size={16} className="text-accent-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="glass-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>

            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-4 p-4 glass rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-semibold text-primary">Credit/Debit Card</p>
                  <p className="text-sm text-secondary">Visa, MasterCard, Mir</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 glass rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-semibold text-primary">Bank Transfer</p>
                  <p className="text-sm text-secondary">Direct bank payment</p>
                </div>
              </label>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={session.user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 glass rounded-lg text-primary disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={session.user?.name || ''}
                  disabled
                  className="w-full px-4 py-2 glass rounded-lg text-primary disabled:opacity-50"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="mb-8">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 mt-1"
                />
                <span className="text-sm text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-accent-primary hover:underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-accent-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full btn-primary py-3 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Payment
                  <span className="text-lg">₽{price}</span>
                </>
              )}
            </button>

            <p className="text-xs text-tertiary text-center mt-4">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
