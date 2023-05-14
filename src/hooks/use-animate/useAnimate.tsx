import { useContext } from 'react';
import { AnimateContext } from './AnimateContext';

export function useAnimate() {
  const context = useContext(AnimateContext);

  if (!context) {
    throw new Error('useAnimate hook was called outside of AnimateProvider context');
  }

  return context;
}
