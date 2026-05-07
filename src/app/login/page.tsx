'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Logo from '@/components/Logo';
import { ArrowRight, Mail, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Try to sign in with credentials
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      setError('Sign in failed. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use email provider for magic link
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.error) {
        setError('Failed to send magic link');
      } else if (result?.ok) {
        setSuccess(true);
        setEmail('');
      }
    } catch (error) {
      setError('Failed to send magic link');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Logo size="md" variant="icon" withGlow={true} />
            </motion.div>
            <h1 className="text-2xl font-black text-white mb-2 tracking-wider mt-4">ERLIKH.AI</h1>
            <p className="text-gray-400 font-mono text-sm">CORTEX OS 4.0</p>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          {/* Status Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm"
            >
              ✓ Success! Redirecting...
            </motion.div>
          )}

          {/* Email Sign In Form */}
          <motion.form
            onSubmit={handleEmailSignIn}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                EMAIL
              </label>
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
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <Lock size={16} className="text-blue-400" />
                PASSWORD
              </label>
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
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 tracking-wide disabled:opacity-50"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
              {!isLoading && <ArrowRight size={18} />}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-[#000000] via-[#0a0e27] to-[#0f1430] text-gray-500 font-mono">OR</span>
            </div>
          </div>

          {/* Magic Link Section */}
          <div className="space-y-3">
            <p className="text-center text-xs text-gray-400">
              Don't have a password? Sign up with email below
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMagicLink}
              disabled={isLoading || !email}
              className="w-full px-4 py-2 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all text-sm disabled:opacity-50"
            >
              SEND MAGIC LINK
            </motion.button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-3 mt-6 pt-6 border-t border-white/10">
            <p>No account yet? Contact: support@erlikh.ai</p>
            <Link href="/" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold">
              Back to Home <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6 text-xs text-gray-400 font-mono">
          🔐 Enterprise-grade security with end-to-end encryption
        </div>
      </motion.div>
    </div>
  );
}
