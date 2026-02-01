import React, { useMemo } from 'react';
import Balloons from './components/Balloons';
import Countdown from './components/Countdown';
import BirthdayWizard from './components/BirthdayWizard';
import MysteryGift from './components/MysteryGift';

const App: React.FC = () => {
  const NAME = "Cute Nanu";

  // Logic for dates
  const { targetDate, turningAge } = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = 2019;
    
    // March is month 2 (0-indexed)
    let nextBirthday = new Date(currentYear, 2, 25, 0, 0, 0);

    // If birthday has passed this year, target next year
    if (today.getTime() > nextBirthday.getTime()) {
      nextBirthday = new Date(currentYear + 1, 2, 25, 0, 0, 0);
    }

    const turningAge = nextBirthday.getFullYear() - birthYear;

    return { targetDate: nextBirthday, turningAge };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center py-10 px-4 relative">
      {/* Background Interactive Layer */}
      <Balloons />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        
        {/* Header */}
        <header className="mb-8 animate-bounce">
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-sm pb-2 leading-tight">
            {NAME}'s <br className="sm:hidden" /> Birthday Bash!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 font-semibold mt-2">
            March 25th • Turning <span className="text-pink-500 text-3xl">{turningAge}</span>!
          </p>
        </header>

        {/* Countdown Timer */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-white/50 w-full mb-6">
           <h2 className="text-2xl sm:text-3xl text-blue-700 font-bold mb-4 uppercase tracking-widest">Time Until Party</h2>
           <Countdown targetDate={targetDate} />
        </div>

        {/* New Feature: Interactive Mystery Gift */}
        <MysteryGift name={NAME} />

        {/* AI Wizard Section */}
        <BirthdayWizard name={NAME} age={turningAge} />

      </div>

      <footer className="relative z-10 mt-auto pt-10 text-gray-500 text-sm font-medium">
        <p>Created with ❤️ for {NAME} (born in 2019) 🎂</p>
      </footer>
    </div>
  );
};

export default App;