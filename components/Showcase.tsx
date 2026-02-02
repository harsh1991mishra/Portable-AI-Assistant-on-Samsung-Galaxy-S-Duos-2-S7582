
import React from 'react';
import { PORTFOLIO_LINKS } from '../constants';

const Showcase: React.FC = () => {
  const shareLinks = [
    { name: "GitHub", url: PORTFOLIO_LINKS.github, color: "bg-gray-800", icon: "🐙" },
    { name: "Portfolio", url: PORTFOLIO_LINKS.website, color: "bg-orange-600", icon: "✨" },
    { name: "LinkedIn", url: PORTFOLIO_LINKS.linkedin, color: "bg-blue-700", icon: "💼" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied! Now you can use it on GitHub.");
  };

  const simpleReadme = `# 🤖 Meet Baba! 
I turned my old phone into a smart robot friend.
- **What is it?**: An old Samsung phone that can talk and tell stories.
- **Magic Power**: It uses Gemini AI to think and speak.
- **Why?**: Because recycling is cool and Baba is the best assistant!`;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
      <header>
        <h2 className="text-3xl font-bold mb-2">Baba's Showcase Hub</h2>
        <p className="text-gray-500">Share your new robot friend with the world!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shareLinks.map(link => (
          <a 
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform group shadow-lg`}
          >
            <span className="text-4xl mb-3 group-hover:rotate-12 transition-transform">{link.icon}</span>
            <span className="font-bold text-lg">{link.name}</span>
            <span className="text-xs opacity-60 mt-1 truncate w-full">{link.url}</span>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl border-white/10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-400">
            <span>🎈</span> Simple Story
          </h3>
          <p className="text-sm text-gray-400 mb-6 italic">Copy this to your GitHub README so kids can understand Baba!</p>
          <div className="bg-black/30 p-4 rounded-xl font-mono text-xs text-orange-200 mb-4 whitespace-pre-wrap leading-relaxed">
            {simpleReadme}
          </div>
          <button 
            onClick={() => copyToClipboard(simpleReadme)}
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-xs transition-colors"
          >
            Copy Story to Clipboard
          </button>
        </div>

        <div className="glass p-8 rounded-3xl border-white/10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
            <span>🌍</span> Save the Earth
          </h3>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Every old phone we turn into <b>Baba</b> is one less piece of trash in the ocean. 
            By building this, you are a planet-saving hero!
          </p>
          <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 text-[10px] text-yellow-200 uppercase tracking-widest font-bold text-center">
            Planet Hero Certified 🎖️
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing default export
export default Showcase;
