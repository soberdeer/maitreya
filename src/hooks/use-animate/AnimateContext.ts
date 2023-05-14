import { createContext } from 'react';

export const AnimateContext = createContext<{
  animate: boolean;
  toggleAnimate(): void;
}>({
  animate: true,
  toggleAnimate: () => {},
});
