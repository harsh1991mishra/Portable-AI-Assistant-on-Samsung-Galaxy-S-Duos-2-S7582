
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Guide from './components/Guide';
import Demo from './components/Demo';
import Showcase from './components/Showcase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.OVERVIEW);

  const renderView = () => {
    switch (currentView) {
      case AppView.OVERVIEW:
        return <Overview onStartGuide={() => setCurrentView(AppView.GUIDE)} />;
      case AppView.GUIDE:
        return <Guide />;
      case AppView.DEMO:
        return <Demo />;
      case AppView.SHOWCASE:
        return <Showcase />;
      default:
        return <Overview onStartGuide={() => setCurrentView(AppView.GUIDE)} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Sidebar - Persistent Navigation */}
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto h-full">
          {renderView()}
        </div>
      </main>

      {/* Footer Mobile Navigation */}
      <div className="md:hidden sticky bottom-0 w-full glass border-t border-white/10 flex justify-around p-3 z-50">
        <button 
          onClick={() => setCurrentView(AppView.OVERVIEW)}
          className={`p-2 rounded-lg ${currentView === AppView.OVERVIEW ? 'text-blue-400' : 'text-gray-400'}`}
        >
          🏠
        </button>
        <button 
          onClick={() => setCurrentView(AppView.GUIDE)}
          className={`p-2 rounded-lg ${currentView === AppView.GUIDE ? 'text-blue-400' : 'text-gray-400'}`}
        >
          📖
        </button>
        <button 
          onClick={() => setCurrentView(AppView.DEMO)}
          className={`p-2 rounded-lg ${currentView === AppView.DEMO ? 'text-blue-400' : 'text-gray-400'}`}
        >
          🤖
        </button>
        <button 
          onClick={() => setCurrentView(AppView.SHOWCASE)}
          className={`p-2 rounded-lg ${currentView === AppView.SHOWCASE ? 'text-blue-400' : 'text-gray-400'}`}
        >
          💼
        </button>
      </div>
    </div>
  );
};

export default App;
