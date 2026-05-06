'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, ArrowUp, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  agent?: 'Claude' | 'Gemini' | 'Qwen';
  timestamp: Date;
}

export default function ChatPanel() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Welcome to Cortex OS v4.0. I\'m your multi-LLM assistant. How can I help you today?',
      agent: 'Claude',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend dispatch endpoint
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({
          query: input,
          context: messages.map((m) => ({
            type: m.type,
            content: m.content,
          })),
          userId: session?.user?.email,
          tier: session?.user?.tier || 'free',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from agent');
      }

      const data = await response.json();

      // Add agent response
      const agentMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'agent',
        content: data.response || 'Processing your request...',
        agent: data.agent || 'Claude',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);

      // Save to chat history
      await fetch('/api/chat/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({
          userId: session?.user?.email,
          userMessage: input,
          agentResponse: data.response,
          agent: data.agent,
        }),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'agent',
        content: 'Sorry, I encountered an error. Please try again.',
        agent: 'System',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0a0e27] to-[#0f1430]">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 glass">
        <h2 className="text-lg font-semibold text-primary">Cortex Workspace</h2>
        <p className="text-xs text-secondary">Multi-LLM collaborative space</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#0066cc] to-[#9333ea] text-white rounded-br-none'
                  : 'glass text-secondary rounded-bl-none'
              }`}
            >
              {message.type === 'agent' && (
                <p className="text-xs font-semibold text-accent-primary mb-1">
                  {message.agent || 'Agent'}
                </p>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-accent-secondary rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-accent-tertiary rounded-full animate-pulse delay-200" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={scrollEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 glass">
        <div className="flex gap-2">
          <button className="p-2 glass hover:bg-white/20 rounded-lg transition-colors">
            <Paperclip size={20} className="text-accent-primary" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message... (max 1000 chars)"
            maxLength={1000}
            disabled={isLoading}
            className="input-base flex-1 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 gradient-accent rounded-lg text-white hover:shadow-lg disabled:opacity-50 transition-all duration-200 hover:scale-105"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : input.trim() ? (
              <Send size={20} />
            ) : (
              <ArrowUp size={20} className="opacity-50" />
            )}
          </button>
        </div>
        <p className="text-xs text-tertiary mt-2">{input.length}/1000</p>
      </div>
    </div>
  );
}

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0a0e27] to-[#0f1430]">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 glass">
        <h2 className="text-lg font-semibold text-primary">Cortex Workspace</h2>
        <p className="text-xs text-secondary">Multi-LLM collaborative space</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#0066cc] to-[#9333ea] text-white rounded-br-none'
                  : 'glass text-secondary rounded-bl-none'
              }`}
            >
              {message.type === 'agent' && (
                <p className="text-xs font-semibold text-accent-primary mb-1">
                  {message.agent || 'Agent'}
                </p>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-accent-secondary rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-accent-tertiary rounded-full animate-pulse delay-200" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 glass">
        <div className="flex gap-2">
          <button className="p-2 glass hover:bg-white/20 rounded-lg transition-colors">
            <Paperclip size={20} className="text-accent-primary" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message... (max 1000 chars)"
            maxLength={1000}
            className="input-base flex-1"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 gradient-accent rounded-lg text-white hover:shadow-lg disabled:opacity-50 transition-all duration-200 hover:scale-105"
          >
            {input.trim() ? (
              <Send size={20} />
            ) : (
              <ArrowUp size={20} className="opacity-50" />
            )}
          </button>
        </div>
        <p className="text-xs text-tertiary mt-2">{input.length}/1000</p>
      </div>
    </div>
  );
}
