import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTooltipProps {
  content: React.ReactNode;
  className?: string;
}

const PricingTooltip: React.FC<PricingTooltipProps> = ({ content, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Tooltip */}
      <div className={cn("relative hidden md:block", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="w-6 h-6 rounded-full bg-biz-navy/10 text-biz-navy 
                     flex items-center justify-center text-sm font-bold
                     hover:bg-biz-navy hover:text-white transition-colors"
          aria-label="More information"
        >
          <Info className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-8 w-72 md:w-80 p-4 
                          bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50
                          animate-fade-in">
            <div className="absolute -top-2 right-3 w-4 h-4 bg-gray-900 
                            transform rotate-45" />
            <div className="relative whitespace-pre-line text-left">
              {content}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "w-6 h-6 rounded-full bg-biz-navy/10 text-biz-navy md:hidden",
          "flex items-center justify-center text-sm font-bold",
          "hover:bg-biz-navy hover:text-white transition-colors",
          className
        )}
        aria-label="More information"
      >
        <Info className="w-4 h-4" />
      </button>

      {/* Mobile Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl 
                          p-6 max-h-[70vh] overflow-y-auto animate-slide-up">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" 
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="pr-8 text-sm text-gray-700 whitespace-pre-line">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingTooltip;
