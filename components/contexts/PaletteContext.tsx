import { createContext } from 'react';
import { defaultPalette } from '../../util/theme';

const PaletteContext = createContext({
  paletteName: 'green',
  palette: defaultPalette,
  setPalette: () => {},
});

export default PaletteContext;
