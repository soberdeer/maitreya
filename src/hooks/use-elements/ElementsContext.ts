import { createContext } from 'react';
import { TypeElementsFields } from '@src/util/types';

export const ElementsContext = createContext<{ elements: TypeElementsFields[] }>({ elements: [] });
