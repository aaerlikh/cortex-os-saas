'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, LogOut, Settings, Zap, MessageSquare, Users, Folder } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(true);

  const menuItems = [
    { icon: Zap, label: 'Operational Set', href: '/' },
    { icon: Users, label: 'Advisory Board', href: '/board' },
    { icon: MessageSquare, label: 'Mentor Group', href: '/mentors' },
    { icon: Folder, label: 'My Spaces', href: '/spaces' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-[#0f1430] to-[#151b35] border-r border-white/10 glass`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {isOpen && (
          <div className="flex flex-col">
            <h1 className="text-lg font-bold gradient-accent bg-clip-text text-transparent">
              Cortex OS
            </h1>
            <p className="text-xs text-secondary">v4.0</p>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:text-primary hover:bg-white/10 transition-all duration-200 group"
          >
            <item.icon size={20} className="text-accent-primary" />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="my-4 mx-4 border-t border-white/10" />

      {/* User Profile & Balance */}
      {isOpen && session?.user && (
        <div className="p-4 border-t border-white/10">
          <div className="glass-sm p-3 mb-3">
            <p className="text-xs text-tertiary">Balance</p>
            <p className="text-lg font-bold text-primary">₽ 12,450</p>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-tertiary">
              <p className="font-semibold text-primary">{session.user.name}</p>
              <p className="truncate">{session.user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 flex gap-2">
        <button className="flex-1 p-2 glass hover:bg-white/20 rounded-lg transition-colors">
          <Settings size={18} className="mx-auto" />
        </button>
        <button
          onClick={() => signOut()}
          className="flex-1 p-2 glass hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
        >
          <LogOut size={18} className="mx-auto" />
        </button>
      </div>
    </aside>
  );
}
