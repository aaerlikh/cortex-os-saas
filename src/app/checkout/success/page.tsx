'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId') || searchParams.get('payment_id');
  const plan = searchParams.get('plan') || 'Pro';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center glass-lg p-8 rounded-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="flex items-center justify-center w-20 h-20 rounded-full gradient-accent mx-auto mb-6"
        >
          <Check size={40} className="text-white" />
        </motion.div>

        <h1 className="text-4xl font-bold text-primary mb-2">Payment Successful!</h1>
        <p className="text-secondary mb-8">
          Welcome to {plan} Plan. Your subscription is now active.
        </p>

        {paymentId && (
          <p className="text-xs text-tertiary mb-6">
            Payment ID: <code className="bg-white/5 px-2 py-1 rounded">{paymentId}</code>
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block px-6 py-3 btn-primary text-center rounded-lg font-semibold"
          >
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] flex items-center justify-center">
        <div className="text-secondary">Processing...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
