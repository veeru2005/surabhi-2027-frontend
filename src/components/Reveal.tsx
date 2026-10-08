import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type Dir = 'up' | 'left' | 'right' | 'zoom';

interface Props {
  children: ReactNode;
  dir?: Dir;
  as?: ElementType;
  className?: string;
}

/** Wrap anything to animate it in on scroll. */
export default function Reveal({ children, dir = 'up', as: Tag = 'div', className = '' }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal reveal--${dir} ${className}`}>
      {children}
    </Tag>
  );
}
