'use client';

import React from 'react';
import { XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CancelPage() {
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
          <XCircle size={64} className="text-orange-400 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Payment Cancelled
        </h1>
        <p className="text-secondary mb-8">
          Your payment was not completed. Your account remains on the Free plan.
        </p>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-secondary">
            💡 No charges were made to your account. You can try again anytime.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/pricing" className="btn-primary py-3 font-semibold flex items-center justify-center gap-2">
            Try Again
            <ArrowRight size={18} />
          </Link>
          <Link href="/" className="btn-secondary py-3 font-semibold">
            Continue with Free Plan
          </Link>
        </div>

        <p className="text-xs text-tertiary mt-6">
          Questions?{' '}
          <a href="mailto:support@erlikh.ai" className="text-accent-primary hover:underline">
            Contact support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
