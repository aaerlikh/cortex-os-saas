'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Zap, ArrowRight, Sparkles, Shield, Code2, Cpu, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If authorized, show MainLayout
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#000000] via-[#0a0e27] to-[#0f1430]">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
          >
            <Zap size={32} className="text-white" />
          </motion.div>
          <p className="text-gray-400 font-mono">LOADING CORTEX OS...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return <MainLayout />;
  }

  // Landing Page for Unauthenticated Users
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#000000] via-[#0a0e27] to-[#0f1430] overflow-hidden">
      {/* Pixelated Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(90deg, #0066cc 1px, transparent 1px), linear-gradient(#0066cc 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-lg blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-lg blur-3xl"
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-blue-500/50"></div>
          <div>
            <h1 className="text-lg font-black text-white tracking-wider">ERLIKH.AI</h1>
            <p className="text-xs text-gray-400 font-mono">CORTEX OS 4.0</p>
          </div>
        </div>
        <button
          onClick={() => signIn()}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm"
        >
          SIGN IN
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider">MULTI-LLM POWERED</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
            YOUR AI OPERATING
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SYSTEM
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cortex OS integrates Claude, Gemini, and specialized agents into one unified interface. Ask anything, collaborate with AI, automate complex workflows.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-black rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all tracking-wide"
            >
              GET STARTED FREE
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/20 text-white text-lg font-black rounded-lg hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all tracking-wide"
            >
              VIEW PRICING
            </motion.button>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-gray-400 font-mono">
            ✨ No credit card. Start with 10 free queries.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-32 max-w-4xl w-full"
        >
          {[
            {
              icon: Cpu,
              title: 'Multi-LLM Router',
              desc: 'Automatically routes queries to the optimal AI model for best results',
            },
            {
              icon: Shield,
              title: 'Enterprise Security',
              desc: 'End-to-end encryption and SOC 2 compliance for your data',
            },
            {
              icon: Gauge,
              title: 'Real-Time Collab',
              desc: 'Share workspaces and collaborate with your team instantly',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all">
                <feature.icon size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-32 max-w-4xl w-full text-center"
        >
          {[
            { value: '47K+', label: 'Active Users' },
            { value: '4M+', label: 'Queries/Month' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map((stat, i) => (
            <div key={i} className="backdrop-blur-md p-6 rounded-lg border border-white/10">
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 font-semibold tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p className="font-mono">© 2026 ERLIKH.AI. All rights reserved.</p>
          <div className="flex gap-6 font-semibold">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}