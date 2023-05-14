import localFont from 'next/font/local';
import { Global } from '@mantine/core';

const Arounder = localFont({
  src: './arounder.ttf',
  display: 'swap',
});

// console.log(roboto)
export const GlobalStyles = () => (
  <Global
    styles={(theme) => ({
      '@font-face': {
        fontFamily: 'Arounder',
        src: `url('${Arounder}') format("ttf")`,
        fontWeight: 400,
        sizeAdjust: '120%',
        fontStyle: 'normal',
      },

      'html,body': {
        WebkitFontSmoothing: 'antialiased',
        fontFamily: 'Roboto, sans-serif',
        transition: 'color 100ms ease, text-shadow 100ms ease, background-color 100ms ease',
        padding: 0,
        margin: 0,
        color: '#00e6e6',
      },

      html: {
        backgroundColor: '#c3c3c3',
        // '@media (prefers-color-scheme: dark)': {
        colorScheme: 'dark',
        // },
      },

      body: {
        ...theme.fn.fontStyles(),

        '@media (prefers-color-scheme: dark)': {
          color: '#33ffff',
        },

        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '& *::-webkit-scrollbar': {
          display: 'none',
        },
      },

      'h1, h2, h3, h4, h5, h6': {
        fontFamily: '"Arounder", sans-serif',
        letterSpacing: '.1em',
      },

      input: {
        colorScheme: 'dark',
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
      },

      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },

      chatbro_minimized_chat: {
        transition: 'bottom 200ms ease',
        [`@media screen and (min-width: ${theme.breakpoints.xs}px)`]: {
          bottom: '20px !important',
        },
      },

      chatbro_messages_wrapper: {
        [`@media screen and (min-width: ${theme.breakpoints.xs}px)`]: {
          background: 'transparent !important',
        },
      },
      chatbro_messages_block: {
        [`@media screen and (min-width: ${theme.breakpoints.xs}px)`]: {
          background: 'background: rgba(8, 34, 33, 0.7) !important;',
        },
      },
    })}
  />
);
