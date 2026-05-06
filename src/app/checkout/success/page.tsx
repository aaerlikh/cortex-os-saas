'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!paymentId) {
          setError('No payment ID provided');
          setIsVerifying(false);
          return;
        }

        // Call backend to verify payment
        const response = await fetch(`/api/payment/verify?paymentId=${paymentId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        const data = await response.json();

        if (data.status === 'succeeded') {
          setIsVerifying(false);
        } else {
          setError('Payment verification failed');
          setIsVerifying(false);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('An error occurred while verifying your payment');
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35]">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Loader className="animate-spin mx-auto" size={48} />
          </motion.div>
          <p className="text-secondary text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-lg p-8 text-center max-w-md rounded-2xl"
        >
          <h1 className="text-2xl font-bold text-primary mb-4">Payment Error</h1>
          <p className="text-secondary mb-8">{error}</p>
          <Link href="/pricing" className="btn-primary inline-block">
            Back to Pricing
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-lg p-8 text-center max-w-md rounded-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6"
        >
          <CheckCircle size={64} className="text-green-400 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Payment Successful!
        </h1>
        <p className="text-secondary mb-2">
          Your subscription has been activated
        </p>
        <p className="text-sm text-tertiary mb-8">
          A confirmation email has been sent to your inbox
        </p>

        <div className="space-y-3 mb-8">
          <div className="p-4 glass rounded-lg">
            <p className="text-sm text-secondary mb-1">Subscription Status</p>
            <p className="text-lg font-bold text-green-400">✓ Active</p>
          </div>
          <div className="p-4 glass rounded-lg">
            <p className="text-sm text-secondary mb-1">Next Billing</p>
            <p className="text-lg font-bold text-primary">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-primary py-3 font-semibold">
            Go to Dashboard
          </Link>
          <Link href="/pricing" className="btn-secondary py-3 font-semibold">
            Manage Subscription
          </Link>
        </div>

        <p className="text-xs text-tertiary mt-6">
          💡 Tip: Check your email for your receipts and account details
        </p>
      </motion.div>
    </div>
  );
}
