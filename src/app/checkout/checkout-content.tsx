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

export default function CheckoutContent() {
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
      // Call backend to create payment session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          period,
        }),
      });

      const data = await response.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      } else {
        alert('Payment processing failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!plan) {
    return <div className="text-center text-secondary">Plan not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/pricing" className="flex items-center gap-2 text-secondary hover:text-primary mb-8">
          <ArrowLeft size={20} />
          Back to Plans
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-lg p-8 rounded-2xl"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Checkout</h1>
          <p className="text-secondary mb-8">Complete your subscription to {plan.name}</p>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-secondary">Plan:</span>
                <span className="text-primary font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">Price:</span>
                <span className="text-accent-primary font-bold">₽{price.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || !session}
              className="w-full px-6 py-3 btn-primary rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader className="animate-spin" size={20} /> : <Check size={20} />}
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
