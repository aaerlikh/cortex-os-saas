'use client';

import React from 'react';
import { FileText, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'txt' | 'csv';
  size: string;
}

export default function StatusPanel() {
  const currentAgent = 'Claude';
  const isThinking = false;

  const documents: Document[] = [
    { id: '1', name: 'Project_Roadmap.pdf', type: 'pdf', size: '2.4 MB' },
    { id: '2', name: 'Budget_Q2_2026.xlsx', type: 'csv', size: '1.2 MB' },
    { id: '3', name: 'API_Documentation.md', type: 'txt', size: '856 KB' },
  ];

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'Claude':
        return 'from-blue-500 to-blue-600';
      case 'Gemini':
        return 'from-orange-500 to-red-600';
      case 'Qwen':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full w-80 bg-gradient-to-b from-[#0a0e27] to-[#0f1430] border-l border-white/10">
      {/* Header */}
      <div className="p-4 border-b border-white/10 glass">
        <h3 className="text-sm font-semibold text-primary">Status & Context</h3>
      </div>

      {/* Agent Status */}
      <div className="p-4 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-tertiary font-semibold">ACTIVE AGENT</p>
            {isThinking && (
              <span className="text-xs text-accent-primary font-semibold animate-pulse">
                Processing...
              </span>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-r ${getAgentColor(currentAgent)}`}>
            <p className="text-sm font-bold text-white">{currentAgent}</p>
            <p className="text-xs text-white/80">Multi-LLM Router</p>
          </div>

          {isThinking && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 p-3 glass rounded-lg"
            >
              <div className="w-2 h-2 bg-accent-primary rounded-full" />
              <span className="text-xs text-secondary">Thinking...</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="p-4 border-b border-white/10">
        <p className="text-xs text-tertiary font-semibold mb-3">SYSTEM STATUS</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-secondary">API: Operational</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-secondary">DB: Connected</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-secondary">Vector Cache: 94%</span>
          </div>
        </div>
      </div>

      {/* Attached Documents */}
      <div className="p-4 border-b border-white/10 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-tertiary font-semibold">ATTACHED FILES</p>
          <span className="text-xs bg-accent-primary/20 text-accent-primary px-2 py-1 rounded">
            {documents.length}
          </span>
        </div>
        <div className="space-y-2">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-2 glass hover:bg-white/10 rounded-lg cursor-pointer transition-all"
            >
              <div className="flex items-start gap-2">
                <FileText size={16} className="text-accent-tertiary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-primary truncate">{doc.name}</p>
                  <p className="text-xs text-tertiary">{doc.size}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full btn-primary text-sm">
          <Zap size={16} className="inline mr-2" />
          Optimize Context
        </button>
      </div>
    </div>
  );
}
