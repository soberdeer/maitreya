import { openModal as mantineOpenModal } from '@mantine/modals';
import { ModalSettings } from '@mantine/modals/lib/context';
import colors from '../styles/colors';

export function openModal({ children, styles, ...others }: ModalSettings) {
  return mantineOpenModal({
    children,
    styles: () => ({
      root: {
        zIndex: 3000,
      },
      modal: {
        backgroundColor: 'rgba(2, 17, 20, 0.95)',
      },
      close: {
        color: colors.primary,
        border: `1px solid ${colors.primary} !important`,
        display: 'flex !important',
        marginRight: '10px !important',
        transition: 'filter 200ms ease !important',
        borderRadius: 0,

        '&:active, &:hover': {
          backgroundColor: 'transparent',
          filter: 'brightness(1.3)',
        },
      },
      ...styles,
    }),
    closeOnEscape: true,
    closeOnClickOutside: true,
    closeButtonProps: { children: 'Закрыть', sx: { overflow: 'hidden' } },
    centered: true,
    size: 600,
    ...others,
  });
}
