import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <section className={cn('bg-white rounded-lg shadow p-4', className)} aria-label={title ?? 'Card'}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </section>
  );
};
