
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: AppView.OVERVIEW, label: "Overview", icon: "🏠" },
    { id: AppView.GUIDE, label: "The Guide", icon: "📖" },
    { id: AppView.DEMO, label: "Talk to Baba", icon: "🤖" },
    { id: AppView.SHOWCASE, label: "Showcase Hub", icon: "💼" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 glass border-r border-white/10 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Baba
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">AI Companion</p>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === item.id 
                ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30' 
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <p className="text-xs text-orange-300">Harsh Mishra</p>
          <p className="text-[10px] text-gray-500">Baba Assistant Project</p>
        </div>
      </div>
    </aside>
  );
};

// Add missing default export
export default Sidebar;
