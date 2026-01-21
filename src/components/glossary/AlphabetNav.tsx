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
    <nav 
      aria-label="Alphabetical navigation"
      className="flex flex-wrap justify-center gap-1 sm:gap-2 py-4"
    >
      {alphabet.map((letter) => {
        const isAvailable = availableLetters.has(letter);
        const isActive = activeLetter === letter;
        
        return (
          <button
            key={letter}
            onClick={() => isAvailable && onLetterClick(letter)}
            disabled={!isAvailable}
            className={`
              w-8 h-8 sm:w-9 sm:h-9 rounded-md font-semibold text-sm sm:text-base
              transition-all duration-200
              ${isActive 
                ? 'bg-[hsl(var(--biz-green))] text-white shadow-md scale-110' 
                : isAvailable 
                  ? 'bg-white text-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-green))] hover:text-white cursor-pointer shadow-sm border border-[hsl(var(--biz-grey))]' 
                  : 'bg-[hsl(var(--biz-grey))]/30 text-muted-foreground/40 cursor-not-allowed'
              }
            `}
            aria-label={isAvailable ? `Jump to terms starting with ${letter}` : `No terms starting with ${letter}`}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
};

export default AlphabetNav;
