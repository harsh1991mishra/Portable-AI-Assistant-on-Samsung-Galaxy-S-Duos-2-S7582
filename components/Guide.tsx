
import React, { useState } from 'react';
import { STEPS } from '../constants';

const Guide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-2">Transformation Guide</h2>
          <p className="text-gray-500">Follow these steps to revive your S7582.</p>
        </div>
        <div className="text-right">
          <span className="text-blue-500 font-bold text-4xl">{activeStep + 1}</span>
          <span className="text-gray-600 text-xl"> / {STEPS.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                activeStep === idx 
                ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-glow' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{step.icon}</span>
                <span className="font-semibold text-sm truncate">{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 glass p-8 rounded-3xl min-h-[400px] flex flex-col">
          <div className="text-5xl mb-6">{STEPS[activeStep].icon}</div>
          <h3 className="text-3xl font-bold mb-4">{STEPS[activeStep].title}</h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {STEPS[activeStep].description}
          </p>
          
          <ul className="space-y-4 flex-1">
            {STEPS[activeStep].details.map((detail, i) => (
              <li key={i} className="flex gap-3 text-gray-300">
                <span className="text-blue-500 font-bold">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-200/80 text-sm">
            <span className="font-bold mr-2 uppercase tracking-widest text-[10px]">Pro Tip:</span>
            {STEPS[activeStep].tips}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/10">
        <button 
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
        >
          Previous Step
        </button>
        <button 
          onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))}
          disabled={activeStep === STEPS.length - 1}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Guide;
