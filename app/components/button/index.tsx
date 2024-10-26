import clsx from 'clsx';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <>
        <button
          className={twMerge(
            clsx('bg-secondary text-white rounded-2xl h-[60px]', className),
          )}
          {...rest}
          ref={ref}
        >
          {children}
        </button>
      </>
    );
  },
);

Button.displayName = 'Button';

export default Button;
