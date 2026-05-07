'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Zap, ArrowRight, Sparkles, Shield, Zap as ZapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If authorized, show MainLayout
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35]">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-lg gradient-accent mb-4"
          >
            <Zap size={32} className="text-white" />
          </motion.div>
          <p className="text-secondary">Loading Cortex OS...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return <MainLayout />;
  }

  // Landing Page for Unauthenticated Users
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35] overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 border-b border-white/10 glass">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-lg gradient-accent"
            whileHover={{ scale: 1.1 }}
          >
            <Zap size={20} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-primary">Erlikh.ai</h1>
            <p className="text-xs text-secondary">Cortex OS v4.0</p>
          </div>
        </div>
        <button
          onClick={() => signIn()}
          className="px-6 py-2 btn-primary text-sm"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-accent-primary" />
            <span className="text-xs font-semibold text-secondary">Multi-LLM Powered</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Your Personal
            <br />
            <span className="gradient-accent bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>

          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Cortex OS integrates Claude, Gemini, and specialized agents to transform how professionals work. Ask anything, collaborate with AI, automate complex workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
              className="px-8 py-4 btn-primary text-lg font-semibold flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 btn-secondary text-lg font-semibold"
            >
              View Pricing
            </motion.button>
          </div>

          <p className="text-sm text-tertiary">✨ No credit card required. Start with 10 free queries.</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full"
        >
          {[
            {
              icon: Zap,
              title: 'Multi-LLM Router',
              desc: 'Automatically route queries to optimal AI model',
            },
            {
              icon: Shield,
              title: 'Enterprise Security',
              desc: 'End-to-end encryption & SOC 2 compliance',
            },
            {
              icon: ZapIcon,
              title: 'Real-Time Collaboration',
              desc: 'Share workspaces and collaborate with teams',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-lg p-6 text-left"
            >
              <feature.icon size={24} className="text-accent-primary mb-3" />
              <h3 className="text-lg font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-secondary text-sm">
          <p>© 2026 Erlikh.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
