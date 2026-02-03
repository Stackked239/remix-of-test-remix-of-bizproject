import React from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  label: string;
  id: string;
  suffix?: string;
  min?: number;
  max?: number;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = "0",
  label,
  id,
  suffix,
  min = 0,
  max = 100,
  className
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(rawValue) || 0;
    const clampedValue = Math.min(Math.max(numericValue, min), max);
    onChange(clampedValue);
  };

  return (
    <div className={cn("relative", className)}>
      <label 
        htmlFor={id} 
        className="sr-only"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={value > 0 ? value : ''}
          onChange={handleChange}
          placeholder={placeholder}
          inputMode="numeric"
          className={cn(
            "w-full h-12 px-4 rounded-lg border-2 border-border",
            "bg-white text-biz-navy font-open-sans text-lg",
            "focus:border-biz-navy focus:ring-2 focus:ring-biz-navy/20 focus:outline-none",
            "transition-all duration-200",
            "placeholder:text-biz-grey/50",
            suffix && "pr-12"
          )}
          aria-label={label}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-biz-grey font-semibold">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
