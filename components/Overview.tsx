
import React from 'react';

interface OverviewProps {
  onStartGuide: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onStartGuide }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <span className="px-3 py-1 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/30 uppercase tracking-tighter">
          Retro-Tech Revived
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
          Turning e-waste into an <br/>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Companion.
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          The Samsung Galaxy S Duos 2 (S7582) was a 2013 mid-range workhorse. 
          Today, it's a paperweight for many. We're giving it a second life as a dedicated 
          desktop AI Assistant using Gemini 3 Flash.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-blue-500/30 transition-colors">
          <div className="text-3xl mb-4">♻️</div>
          <h3 className="text-2xl font-bold mb-3">Sustainability</h3>
          <p className="text-gray-400">Reduce electronic waste by repurposing existing hardware instead of buying new IoT devices.</p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 hover:border-purple-500/30 transition-colors">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-3">Cloud Powered</h3>
          <p className="text-gray-400">By offloading heavy AI computation to the cloud, the S7582 only handles the interface and voice interaction.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button 
          onClick={onStartGuide}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          View The Step-By-Step Guide
        </button>
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <img 
              key={i} 
              src={`https://picsum.photos/seed/${i}/40/40`} 
              className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]" 
              alt="Community member" 
            />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-[10px] font-bold">
            +12k
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
