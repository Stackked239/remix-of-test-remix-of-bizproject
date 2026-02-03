import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoBubbleProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoBubble: React.FC<InfoBubbleProps> = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-5 h-5 rounded-full bg-biz-navy hover:bg-biz-navy-deep text-white flex items-center justify-center text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-biz-navy focus:ring-offset-2"
        aria-label={`Info about ${title}`}
      >
        <Info className="w-3 h-3" />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 w-80 max-w-[90vw] animate-fade-in-up"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative bg-biz-navy/95 text-white rounded-lg shadow-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-montserrat font-semibold text-sm">{title}</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm leading-relaxed font-open-sans space-y-2">
              {children}
            </div>
            {/* Arrow pointing down */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                bottom: '-6px',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(33, 38, 83, 0.95)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBubble;
