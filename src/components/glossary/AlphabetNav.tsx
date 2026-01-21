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
      className="bg-white/80 backdrop-blur-sm border border-[hsl(var(--biz-grey))] rounded-lg px-3 py-2 shadow-sm"
    >
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
                w-7 h-7 rounded text-xs font-semibold
                transition-all duration-150
                ${isActive 
                  ? 'bg-[hsl(var(--biz-green))] text-white shadow-sm' 
                  : isAvailable 
                    ? 'text-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-green))]/10 hover:text-[hsl(var(--biz-green))] cursor-pointer' 
                    : 'text-muted-foreground/30 cursor-not-allowed'
                }
              `}
              aria-label={isAvailable ? `Jump to terms starting with ${letter}` : `No terms starting with ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AlphabetNav;
