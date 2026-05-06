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

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.data?.response || 'Извините, произошла ошибка.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '⚠️ Ошибка подключения. Проверьте, запущен ли Python dispatcher.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (plan: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan,
          userId: 'demo-user',
        }),
      });

      const data = await response.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20 pointer-events-none" />

      {/* Main container */}
      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="flex flex-col leading-tight">
                <h1 className="text-lg font-bold">Erlikh.ai</h1>
                <span className="text-xs text-white/50">Cortex OS 4.0</span>
              </div>
            </div>
            <nav className="flex gap-6 text-sm">
              <button className="text-white/70 hover:text-white transition">Docs</button>
              <button className="text-white/70 hover:text-white transition">API</button>
              <button 
                onClick={() => setShowPricing(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              >
                Upgrade
              </button>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-sm p-4 overflow-y-auto hidden sm:block">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Erlikh.ai чаты</div>
              <button className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
                + Новый чат
              </button>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="px-3 py-2 rounded-lg text-white/70 hover:text-white text-sm cursor-pointer hover:bg-white/5 transition truncate">
                    Предыдущая беседа {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Аккаунт</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium">Free Plan</p>
                <p className="text-xs text-white/50 mt-1">45% квоты использовано</p>
                <div className="mt-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-purple-600" />
                </div>
              </div>
              <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white transition">
                ⚙️ Настройки
              </button>
            </div>
          </aside>

          {/* Chat area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 border border-white/20 text-white/90 backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>
                    <p className="text-xs mt-2 opacity-50">
                      {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce delay-100" />
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Введите ваш вопрос..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 backdrop-blur-sm transition"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="px-4 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition font-medium"
                  >
                    <span className="hidden sm:inline">Отправить</span>
                    <span className="sm:hidden">→</span>
                  </button>
                </div>
                <p className="text-xs text-white/50 mt-2">
                  💡 Подсказка: используйте @файлы для работы с облачным хранилищем
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPricing(false)} />
          <div className="relative bg-black border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPricing(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Erlikh.ai: Выберите план</h2>
            <p className="text-white/70 mb-6">Cortex OS 4.0 — один платёж, полный доступ к ИИ системе</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'starter',
                  name: 'Starter',
                  price: '₽2 900',
                  period: 'в месяц',
                  storage: '50 GB',
                  api: '10K',
                  features: ['Erlikh.ai Chat', 'Облачное хранилище', 'Базовая поддержка'],
                },
                {
                  id: 'professional',
                  name: 'Professional',
                  price: '₽9 900',
                  period: 'в месяц',
                  storage: '500 GB',
                  api: '100K',
                  features: ['Erlikh.ai Chat Pro', 'Приоритетная поддержка', 'API доступ', 'Интеграции'],
                  popular: true,
                },
                {
                  id: 'business',
                  name: 'Business',
                  price: '₽29 900',
                  period: 'в месяц',
                  storage: '∞',
                  api: '∞',
                  features: ['Erlikh.ai Enterprise', 'Выделенный аккаунт', 'SLA 99.9%', 'Custom интеграции'],
                },
              ].map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-4 sm:p-6 border transition ${
                    plan.popular
                      ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-300 mb-3">
                      Популярный
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <div className="text-sm text-white/50">{plan.period}</div>
                  </div>

                  <div className="space-y-2 mb-6 text-sm">
                    <div>Storage: <span className="font-semibold text-blue-400">{plan.storage}</span></div>
                    <div>API: <span className="font-semibold text-blue-400">{plan.api} calls</span></div>
                  </div>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Выбрать
                  </button>

                  <div className="mt-4 space-y-2 text-xs text-white/70">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
