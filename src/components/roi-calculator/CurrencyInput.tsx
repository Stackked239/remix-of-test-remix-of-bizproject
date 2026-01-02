import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  label: string;
  id: string;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  placeholder = "0",
  label,
  id,
  className
}) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value > 0) {
      setDisplayValue(value.toLocaleString('en-US'));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseInt(rawValue, 10) || 0;
    
    setDisplayValue(numericValue > 0 ? numericValue.toLocaleString('en-US') : '');
    onChange(numericValue);
  };

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(value.toLocaleString('en-US'));
    }
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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-biz-grey font-semibold text-lg">
          $
        </span>
        <input
          type="text"
          id={id}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          inputMode="numeric"
          className={cn(
            "w-full h-12 pl-8 pr-4 rounded-lg border-2 border-border",
            "bg-white text-biz-navy font-open-sans text-lg",
            "focus:border-biz-navy focus:ring-2 focus:ring-biz-navy/20 focus:outline-none",
            "transition-all duration-200",
            "placeholder:text-biz-grey/50"
          )}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
