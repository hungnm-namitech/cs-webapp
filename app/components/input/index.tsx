import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="search"
        className={cn(
          'h-[40px] w-full border border-[#8AA0A8] rounded-xl text-xs px-5 focus:border-0',
          className,
        )}
        onChange={onChange}
        defaultValue={value}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
