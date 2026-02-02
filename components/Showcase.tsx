
import React from 'react';
import { PORTFOLIO_LINKS } from '../constants';

const Showcase: React.FC = () => {
  const shareLinks = [
    { name: "GitHub", url: PORTFOLIO_LINKS.github, color: "bg-gray-800", icon: "🐙" },
    { name: "Portfolio", url: PORTFOLIO_LINKS.website, color: "bg-indigo-600", icon: "✨" },
    { name: "LinkedIn", url: PORTFOLIO_LINKS.linkedin, color: "bg-blue-700", icon: "💼" },
  ];

  const projectTitle = "Project Phoenix: Samsung S7582 AI Revitalization";
  const projectDescription = "Transformed a 10-year-old Samsung S7582 into a modern AI assistant using the Gemini API. Reduced e-waste while creating a functional IoT dashboard.";

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
      <header>
        <h2 className="text-3xl font-bold mb-2">Showcase Hub</h2>
        <p className="text-gray-500">Ready to share your project with the world? Use these templates.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shareLinks.map(link => (
          <a 
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:scale-105 transition-transform group`}
          >
            <span className="text-4xl mb-3 group-hover:rotate-12 transition-transform">{link.icon}</span>
            <span className="font-bold text-lg">{link.name}</span>
            <span className="text-xs opacity-60 mt-1 truncate w-full">{link.url}</span>
          </a>
        ))}
      </div>

      <div className="glass p-8 rounded-3xl border-white/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-blue-400">📝</span> LinkedIn/Resume Template
        </h3>
        
        <div className="bg-black/30 p-6 rounded-2xl font-mono text-sm text-gray-400 relative group">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${projectTitle}\n\n${projectDescription}\n\nTech Stack: React, TypeScript, Tailwind, Gemini API, Android Custom ROM.`);
              alert("Copied to clipboard!");
            }}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-lg text-[10px] text-white"
          >
            COPY
          </button>
          <p className="text-blue-400 font-bold mb-2">🚀 {projectTitle}</p>
          <p className="mb-4">{projectDescription}</p>
          <p className="font-bold text-gray-300">Key Achievements:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Breathed new life into 2013 hardware with 768MB RAM.</li>
            <li>Implemented state-of-the-art Gemini 3 Flash LLM integration.</li>
            <li>Designed a responsive React dashboard for low-spec browser engines.</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-3xl border border-blue-500/20 text-center">
        <h3 className="text-2xl font-bold mb-2">Keep Building, Harsh!</h3>
        <p className="text-gray-400 mb-6">Your GitHub and personal site are looking great. This project is a perfect example of hardware-software synergy.</p>
        <div className="flex justify-center gap-4">
           <img src="https://picsum.photos/seed/harsh/60/60" className="w-16 h-16 rounded-full border-4 border-blue-500/30" alt="Harsh Mishra" />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
