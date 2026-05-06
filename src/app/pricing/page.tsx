'use client';

import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: '₽',
    period: 'forever',
    description: 'Perfect for trying out Cortex OS',
    features: [
      '10 queries/month',
      'Basic LLM access (Claude)',
      'Community support',
      'Mobile app access',
      '1GB storage',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2900,
    currency: '₽',
    period: 'per month',
    description: 'For professionals and small teams',
    features: [
      '1,000 queries/month',
      'Multi-LLM access (Claude + Gemini)',
      'Priority email support',
      'Advanced analytics',
      '100GB storage',
      'Custom workspace',
      'API access',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29900,
    currency: '₽',
    period: 'per month',
    description: 'For companies and organizations',
    features: [
      'Unlimited queries',
      'All LLM models (Claude + Gemini + Qwen)',
      '24/7 phone support',
      'Advanced security & compliance',
      'Unlimited storage',
      'Unlimited workspaces',
      'Custom integrations',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const getAnnualDiscount = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.85); // 15% discount for annual
  };

  const handleCheckout = async (planId: string) => {
    if (planId === 'free') {
      // Redirect to signup
      window.location.href = '/login';
      return;
    }

    if (planId === 'enterprise') {
      // Open contact form or redirect to sales
      window.location.href = 'mailto:sales@erlikh.ai?subject=Enterprise%20Plan%20Inquiry';
      return;
    }

    // For Pro plan, redirect to checkout
    window.location.href = `/checkout?plan=${planId}&period=${billingPeriod}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] overflow-hidden pt-20 pb-20">
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Simple, Transparent
            <br />
            <span className="gradient-accent bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Upgrade or downgrade anytime.
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-secondary hover:text-primary'
              }`}
            >
              Monthly
            </button>
            <div className="text-sm text-secondary">or</div>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-secondary hover:text-primary'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Save 15%
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'ring-2 ring-accent-primary glass-lg p-8'
                  : 'glass-lg p-6'
              }`}
            >
              {/* Featured Badge */}
              {plan.highlighted && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                    <Zap size={12} />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name & Description */}
              <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
              <p className="text-secondary text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.price === 0 ? (
                  <p className="text-4xl font-bold text-primary">Free</p>
                ) : (
                  <>
                    <p className="text-4xl font-bold text-primary">
                      {plan.currency}
                      {billingPeriod === 'annual' && plan.id === 'pro'
                        ? getAnnualDiscount(plan.price)
                        : plan.price}
                    </p>
                    <p className="text-secondary text-sm">
                      {billingPeriod === 'annual' ? 'per year' : plan.period}
                    </p>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleCheckout(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold mb-6 transition-all duration-200 ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-secondary text-sm"
                  >
                    <Check size={16} className="text-accent-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 max-w-3xl mx-auto px-4 mt-20"
      >
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I change my plan?',
              a: 'Yes, you can upgrade or downgrade your plan anytime. Changes take effect at the next billing cycle.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, bank transfers, and YooKassa payment methods.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! All Pro plans come with a 14-day free trial. No credit card required.',
            },
            {
              q: 'What happens if I exceed my query limit?',
              a: 'You can upgrade anytime to increase your query limit, or purchase additional queries as needed.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4 }}
              className="glass-sm p-4 rounded-lg"
            >
              <h3 className="font-semibold text-primary mb-2">{item.q}</h3>
              <p className="text-secondary text-sm">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center mt-20"
      >
        <p className="text-secondary mb-4">
          Questions? {' '}
          <a href="mailto:support@erlikh.ai" className="text-accent-primary hover:text-accent-primary/80 font-medium">
            Contact our sales team
          </a>
        </p>
      </motion.div>
    </div>
  );
}
