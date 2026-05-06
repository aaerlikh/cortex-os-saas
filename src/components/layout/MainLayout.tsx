'use client';

import React from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import StatusPanel from './StatusPanel';

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex gap-0">
        {/* Chat Panel */}
        <div className="flex-1 min-w-0">
          <ChatPanel />
        </div>

        {/* Status Panel */}
        <StatusPanel />
      </div>

      {/* Children (fallback for other pages) */}
      {children}
    </div>
  );
}
