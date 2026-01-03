import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PricingTooltip from './PricingTooltip';

interface PricingInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  tooltipContent: React.ReactNode;
  prefix?: string;
  suffix?: string;
  isInteger?: boolean;
  min?: number;
  helperText?: React.ReactNode;
  error?: string;
  className?: string;
}

const PricingInput: React.FC<PricingInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  tooltipContent,
  prefix = "$",
  suffix,
  isInteger = false,
  min = 0,
  helperText,
  error,
  className
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      if (value > 0) {
        setDisplayValue(isInteger ? value.toString() : value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }));
      } else if (value === 0) {
        setDisplayValue('');
      }
    }
  }, [value, isFocused, isInteger]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setDisplayValue(rawValue);
    
    if (rawValue === '' || rawValue === '.') {
      onChange(0);
      return;
    }
    
    const numericValue = parseFloat(rawValue) || 0;
    onChange(numericValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value > 0) {
      setDisplayValue(isInteger ? value.toString() : value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }));
    } else {
      setDisplayValue('');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (value > 0) {
      setDisplayValue(isInteger ? value.toString() : value.toString());
    }
  };

  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center justify-between mb-2">
        <label 
          htmlFor={id} 
          className="text-biz-navy font-semibold text-sm md:text-base font-open-sans"
        >
          {label}
        </label>
        <PricingTooltip content={tooltipContent} />
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-biz-grey font-semibold text-lg">
            {prefix}
          </span>
        )}
        <input
          type="text"
          id={id}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          inputMode={isInteger ? "numeric" : "decimal"}
          className={cn(
            "w-full h-12 rounded-lg border-2 border-border",
            "bg-white text-biz-navy font-open-sans text-lg",
            "focus:border-biz-navy focus:ring-2 focus:ring-biz-navy/20 focus:outline-none",
            "transition-all duration-200",
            "placeholder:text-biz-grey/50",
            prefix ? "pl-8" : "pl-4",
            suffix ? "pr-16" : "pr-4",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20"
          )}
          aria-label={label}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-biz-grey text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-destructive text-sm mt-1">
          {error}
        </p>
      )}
      {helperText && !error && (
        <div className="text-sm text-muted-foreground mt-1">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default PricingInput;
