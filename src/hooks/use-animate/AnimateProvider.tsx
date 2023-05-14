import React from 'react';
import { AnimateContext } from '@src/hooks/use-animate/AnimateContext';

interface ProviderProps {
  animate: boolean;
  toggleAnimate: () => void;
  children: React.ReactNode;
}

export function AnimateProvider({ animate, toggleAnimate, children }: ProviderProps) {
  return (
    <AnimateContext.Provider
      value={{
        animate,
        toggleAnimate,
      }}
    >
      {children}
    </AnimateContext.Provider>
  );
}
