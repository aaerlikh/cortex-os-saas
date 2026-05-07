'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, Code2, Zap, ArrowRight, Lock } from 'lucide-react';
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

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
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
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f1430] to-[#151b35]" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
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
        <div className="glass-lg p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-accent mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Zap size={24} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-primary mb-2">Cortex OS</h1>
            <p className="text-secondary">Sign in to continue</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab('oauth')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                tab === 'oauth'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-secondary hover:text-primary'
              }`}
            >
              Quick Sign In
            </button>
            <button
              onClick={() => setTab('email')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                tab === 'email'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-secondary hover:text-primary'
              }`}
            >
              Email
            </button>
          </div>

          {/* OAuth Options */}
          {tab === 'oauth' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <button
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="w-full py-3 px-4 glass hover:bg-white/20 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-primary hover:text-accent-primary disabled:opacity-50"
              >
                <Mail size={20} />
                Continue with Google
              </button>
              <button
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                className="w-full py-3 px-4 glass hover:bg-white/20 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-primary hover:text-accent-primary disabled:opacity-50"
              >
                <Code2 size={20} />
                Continue with GitHub
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0f1430] text-tertiary">or</span>
                </div>
              </div>
              <button
                onClick={() => setTab('email')}
                className="w-full py-3 px-4 glass hover:bg-white/20 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-primary hover:text-accent-primary"
              >
                <Lock size={20} />
                Use Email Address
              </button>
            </motion.div>
          )}

          {/* Email Form */}
          {tab === 'email' && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleEmailSignIn}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-base w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base w-full"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </motion.form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-tertiary">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Badge */}
        <motion.div
          className="mt-6 text-center text-xs text-secondary"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ Powered by Multi-LLM Cortex Engine
        </motion.div>
      </motion.div>
    </div>
  );
}
