import { createContext } from 'react';
import { ElementProps } from '../../util/types';

const ElementsContext = createContext<{ elements: ElementProps[] }>({
  elements: [],
});

export default ElementsContext;
