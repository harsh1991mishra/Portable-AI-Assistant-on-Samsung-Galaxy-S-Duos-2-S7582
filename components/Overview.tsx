
import React from 'react';

interface OverviewProps {
  onStartGuide: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onStartGuide }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <span className="px-3 py-1 text-xs font-bold text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/30 uppercase tracking-tighter">
          Meet Baba 🤖
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
          Turning your old phone into <br/>
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Baba the Assistant.
          </span>
        </h2>
        
        <div className="bg-orange-600/10 border border-orange-500/20 p-6 rounded-3xl mb-8 shadow-lg shadow-orange-900/10">
          <h3 className="text-xl font-bold mb-2 text-orange-300 flex items-center gap-2">
            🧸 For 5-Year-Old Heroes:
          </h3>
          <p className="text-gray-300 leading-relaxed italic">
            "Baba is like a wise, friendly grandfather-robot who lives inside your old phone. 
            Your old phone was very quiet and lonely, but we are giving it a 'Magic Voice'. 
            Now, you can ask Baba to tell you a story about space or a joke about ducks! 
            Baba is your new best friend who never gets tired of talking."
          </p>
        </div>

        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Project Baba is about recycling with a soul. We take the Samsung S7582 (or any old phone) 
          and connect its heart to the most powerful AI brain available today.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-orange-500/30 transition-colors">
          <div className="text-3xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold mb-3">Happy Planet</h3>
          <p className="text-gray-400 text-sm">Instead of throwing the phone in the trash, we make it a helpful robot friend!</p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-yellow-500/30 transition-colors">
          <div className="text-3xl mb-4">🏠</div>
          <h3 className="text-2xl font-bold mb-3">Home Assistant</h3>
          <p className="text-gray-400 text-sm">Baba sits on your desk and helps with timers, questions, and learning new things.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button 
          onClick={onStartGuide}
          className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-600/20 transition-all active:scale-95"
        >
          Let's Build Baba!
        </button>
      </div>
    </div>
  );
};

// Add missing default export
export default Overview;
