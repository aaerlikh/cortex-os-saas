'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, Code2, Zap, ArrowRight, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<'oauth' | 'email'>('oauth');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: 'google') => {
    signIn(provider, { callbackUrl: '/' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0e27] to-[#0f1430]" />

      {/* Pixelated Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(90deg, #0066cc 1px, transparent 1px), linear-gradient(#0066cc 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-lg blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-lg blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="backdrop-blur-md p-8 border border-white/10 rounded-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
              whileHover={{ scale: 1.1 }}
            >
              <Zap size={28} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-black text-white mb-2 tracking-wider">ERLIKH.AI</h1>
            <p className="text-gray-400 font-mono text-sm">CORTEX OS 4.0</p>
            <p className="text-gray-500 text-sm mt-2">Your AI Operating System</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setTab('oauth')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${ tab === 'oauth' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              OAUTH
            </button>
            <button
              onClick={() => setTab('email')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${tab === 'email' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EMAIL
            </button>
          </div>

          {/* OAuth Tab */}
          {tab === 'oauth' && (
            <motion.div
              key="oauth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 tracking-wide"
              >
                <Code2 size={20} />
                SIGN IN WITH GOOGLE
              </motion.button>
              <p className="text-center text-gray-500 text-xs mt-4">
                🔐 Secure OAuth via Google
              </p>
            </motion.div>
          )}

          {/* Email Tab */}
          {tab === 'email' && (
            <motion.form
              key="email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailSignIn}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 tracking-wide"
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
                {!isLoading && <ArrowRight size={18} />}
              </motion.button>
            </motion.form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-[#000000] via-[#0a0e27] to-[#0f1430] text-gray-500 font-mono">OR</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p>No account? Contacts support@erlikh.ai</p>
            <Link href="/" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold">
              Back to Home <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6 text-xs text-gray-400 font-mono">
          ✨ Enterprise-grade security with end-to-end encryption
        </div>
      </motion.div>
    </div>
  );
}