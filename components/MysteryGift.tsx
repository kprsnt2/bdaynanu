import React, { useState } from 'react';
import { generateMysteryGift } from '../services/geminiService';
import { LoadingState } from '../types';

interface Props {
  name: string;
}

const MysteryGift: React.FC<Props> = ({ name }) => {
  const [giftText, setGiftText] = useState<string>('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = async () => {
    if (loading === LoadingState.LOADING || isOpen) return;

    setLoading(LoadingState.LOADING);
    const gift = await generateMysteryGift(name);
    setGiftText(gift);
    setLoading(LoadingState.SUCCESS);
    setIsOpen(true);
  };

  const handleReset = () => {
    setIsOpen(false);
    setGiftText('');
    setLoading(LoadingState.IDLE);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-4">
      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-white text-center transform hover:scale-[1.02] transition-transform">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">🎁 Mystery Gift Box</h2>
        
        {!isOpen ? (
          <div className="cursor-pointer" onClick={handleOpenGift}>
            <div className={`text-9xl mb-4 select-none ${loading === LoadingState.LOADING ? 'shake-anim' : 'hover:scale-110 transition-transform duration-300'}`}>
              🎁
            </div>
            <p className="text-indigo-500 font-bold animate-pulse">
              {loading === LoadingState.LOADING ? "Unwrapping..." : "Tap to Open!"}
            </p>
          </div>
        ) : (
          <div className="gift-pop">
            <div className="text-8xl mb-2">✨🎊✨</div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">You found:</p>
            <div className="bg-white rounded-xl p-4 shadow-inner mb-4 border-2 border-indigo-200">
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {giftText}
              </p>
            </div>
            <button 
              onClick={handleReset}
              className="text-sm text-indigo-400 hover:text-indigo-600 font-semibold underline"
            >
              Open another gift?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryGift;