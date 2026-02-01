import React, { useState, useEffect, useCallback } from 'react';
import { BalloonType } from '../types';

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9B59B6', // Purple
];

const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);

  const spawnBalloon = useCallback(() => {
    const id = Math.random().toString(36).substr(2, 9);
    const newBalloon: BalloonType = {
      id,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: Math.floor(Math.random() * 90) + 5, // 5% to 95%
      speed: Math.random() * 5 + 5, // 5-10s
      delay: 0,
      size: Math.random() * 0.5 + 0.8, // 0.8 - 1.3 scale
      isPopping: false,
    };

    setBalloons((prev) => [...prev, newBalloon]);

    // Remove balloon after it floats out of view (approx speed + buffer)
    // We only remove if it hasn't been popped (popping removes it separately)
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== id));
    }, newBalloon.speed * 1000 + 100);
  }, []);

  useEffect(() => {
    // Initial spawn
    for (let i = 0; i < 5; i++) spawnBalloon();

    // Continuous spawn
    const interval = setInterval(spawnBalloon, 800);
    return () => clearInterval(interval);
  }, [spawnBalloon]);

  const popBalloon = (id: string) => {
    // Prevent double popping
    setBalloons(prev => {
      const balloon = prev.find(b => b.id === id);
      if (!balloon || balloon.isPopping) return prev;
      
      setPoppedCount(c => c + 1);
      
      // Trigger removal after animation
      setTimeout(() => {
        setBalloons(current => current.filter(b => b.id !== id));
      }, 200); // 200ms matches pop animation

      return prev.map(b => b.id === id ? { ...b, isPopping: true } : b);
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Score Counter */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-lg z-10 pointer-events-auto border-2 border-purple-100">
        <span className="font-bold text-purple-600 text-lg">🎈 Popped: {poppedCount}</span>
      </div>

      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0 pointer-events-auto balloon-float"
          style={{
            left: `${balloon.left}%`,
            animationDuration: `${balloon.speed}s`,
            width: '60px', // Explicit width for hit area
            height: '100px', // Explicit height
          }}
          onClick={() => popBalloon(balloon.id)}
        >
          {/* Inner container for Size Scale */}
          <div 
            style={{ transform: `scale(${balloon.size})`, transformOrigin: 'center bottom' }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Inner SVG for Pop Animation */}
            <div className={balloon.isPopping ? 'pop-animation' : 'cursor-pointer hover:scale-110 transition-transform'}>
              <svg
                width="60"
                height="80"
                viewBox="0 0 60 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}
              >
                <path
                  d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 30 75 30 75C30 75 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z"
                  fill={balloon.color}
                />
                <ellipse cx="18" cy="18" rx="6" ry="10" fill="white" fillOpacity="0.3" transform="rotate(-30 18 18)" />
                <path d="M30 75L30 80" stroke="#888" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;