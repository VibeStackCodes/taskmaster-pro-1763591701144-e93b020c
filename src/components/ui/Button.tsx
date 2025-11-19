import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const Button = React.memo<ButtonProps>(({
  variant = 'primary',
  loading,
  className,
  children,
  ...rest
}) => {
  const base = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-150';
  const color =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700'
      : variant === 'secondary'
      ? 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700'
      : 'border border-primary text-primary hover:bg-primary-50';
  const disabled = rest.disabled ? 'opacity-50 cursor-not-allowed' : '';

  const final = cn(base, color, disabled, className);

  return (
    <button className={final} aria-label={rest['aria-label'] || (typeof children === 'string' ? (children as string) : undefined)} disabled={rest.disabled || Boolean(loading)} {...rest}>
      {loading ? 'Loading...' : children}
    </button>
  );
});

Button.displayName = 'Button';
