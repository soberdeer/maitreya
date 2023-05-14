import React from 'react';
import { TypeElementsFields } from '@src/util/types';
import { ElementsContext } from '@src/hooks/use-elements/ElementsContext';

interface ProviderProps {
  elements: TypeElementsFields[];
  children: React.ReactNode;
}

export function ElementsProvider({ elements, children }: ProviderProps) {
  return (
    <ElementsContext.Provider
      value={{
        elements,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
}
