import { useContext } from 'react';
import { ElementsContext } from './ElementsContext';

export function useElements() {
  const context = useContext(ElementsContext);

  if (!context) {
    throw new Error('useElements hook was called outside of ElementsProvider context');
  }

  return context;
}
