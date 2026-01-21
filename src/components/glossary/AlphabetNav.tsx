import React from 'react';

interface AlphabetNavProps {
  availableLetters: Set<string>;
  onLetterClick: (letter: string) => void;
  activeLetter?: string;
}

const AlphabetNav: React.FC<AlphabetNavProps> = ({ 
  availableLetters, 
  onLetterClick,
  activeLetter 
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center gap-0.5">
      {alphabet.map((letter) => {
        const isAvailable = availableLetters.has(letter);
        const isActive = activeLetter === letter;
        
        return (
          <button
            key={letter}
            onClick={() => isAvailable && onLetterClick(letter)}
            disabled={!isAvailable}
            className={`
              w-5 h-5 text-xs font-medium rounded
              transition-colors duration-150
              ${isActive 
                ? 'bg-[hsl(var(--biz-green))] text-white' 
                : isAvailable 
                  ? 'text-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/10 cursor-pointer' 
                  : 'text-[hsl(var(--biz-green))]/25 cursor-not-allowed'
              }
            `}
            aria-label={isAvailable ? `Jump to ${letter}` : `No terms for ${letter}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default AlphabetNav;
