import React, { useState } from 'react';
import { generateBirthdayStory } from '../services/geminiService';
import { LoadingState } from '../types';

interface Props {
  name: string;
  age: number;
}

const BirthdayWizard: React.FC<Props> = ({ name, age }) => {
  const [story, setStory] = useState<string>('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerateStory = async () => {
    setLoading(LoadingState.LOADING);
    const result = await generateBirthdayStory(name, age);
    setStory(result);
    setLoading(LoadingState.SUCCESS);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto mt-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">✨ The Birthday Wizard ✨</h2>
        <p className="text-gray-600">Ask the wizard for a special story about <b>{name}</b>!</p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerateStory}
          disabled={loading === LoadingState.LOADING}
          className={`
            px-8 py-3 rounded-full font-bold text-white text-lg shadow-lg transform transition-all
            ${loading === LoadingState.LOADING 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:from-purple-600 hover:to-pink-600 active:scale-95'}
          `}
        >
          {loading === LoadingState.LOADING ? 'Summoning Magic... 🪄' : 'Tell Me a Story! 📖'}
        </button>
      </div>

      {story && (
        <div className="bg-yellow-50 rounded-xl p-6 border-2 border-dashed border-yellow-300 max-h-60 overflow-y-auto story-scroll text-left">
          <p className="text-lg text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
            {story}
          </p>
        </div>
      )}
    </div>
  );
};

export default BirthdayWizard;