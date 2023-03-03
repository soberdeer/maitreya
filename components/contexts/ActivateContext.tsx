import { createContext } from 'react';

const ActivateContext = createContext<{
  activate: boolean;
  setActivate(value: boolean): void;
}>({
  activate: false,
  setActivate: () => {},
});

export default ActivateContext;
