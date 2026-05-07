'use client';

import { Suspense } from 'react';
import CheckoutContent from './checkout-content';

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] flex items-center justify-center">
        <div className="text-secondary">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
