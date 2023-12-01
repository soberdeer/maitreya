import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';
import { Global } from '@mantine/core';

export const arounder = localFont({
  src: './arounder.ttf',
  display: 'swap',
  preload: true,
  fallback: ['Roboto', 'sans-serif'],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const GlobalStyles = () => (
  <Global
    styles={(theme) => ({
      'html,body': {
        WebkitFontSmoothing: 'antialiased',
        fontFamily: roboto.style.fontFamily,
        transition: 'color 100ms ease, text-shadow 100ms ease, background-color 100ms ease',
        padding: 0,
        margin: 0,
      },

      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },

      html: {
        backgroundColor: 'black',
        colorScheme: 'dark',
      },

      body: {
        ...theme.fn.fontStyles(),
        fontFamily: roboto.style.fontFamily,
        color: theme.colors.maitreya[3],

        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '& *::-webkit-scrollbar': {
          display: 'none',
        },
      },

      '& *': {
        textAlign: 'left',
      },

      b: {
        // backgroundColor: theme.fn.rgba(theme.colors.yellow[4], 0.2),
        color: theme.colors.maitreya[2],
      },

      'h1, h2, h3, h4, h5, h6': {
        fontFamily: `${arounder.style.fontFamily}, sans-serif`,
        letterSpacing: '.1em',
        fontWeight: 'bold',
        lineHeight: 1.3,
        color: theme.colors.maitreyaSecondary[5],
        textAlign: 'left',
        hyphens: 'auto',
        wordBreak: 'break-word',
      },

      h1: {
        fontSize: '1.75rem',
        textShadow: `0 0 2px ${theme.colors.maitreyaSecondary[5]}`,
        textAlign: 'center',
        [`@media screen and (min-width: ${theme.breakpoints.xs}px)`]: {
          fontSize: '1.4rem',
        },
      },
      h2: {
        fontSize: '1.625rem',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.375rem',
      },
      h5: {
        fontSize: '1.25rem',
      },
      h6: {
        fontSize: '1.125rem',
      },

      p: {
        fontFamily: roboto.style.fontFamily,
        marginBlockStart: 0,
        marginBlockEnd: '1rem',
        textAlign: 'left',
      },

      '*[data-styled]': {
        fontFamily: `${arounder.style.fontFamily}, sans-serif`,
      },

      input: {
        colorScheme: 'dark',
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
        textAlign: 'left',
      },

      chatbro_minimized_chat: {
        transition: 'bottom 200ms ease',
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
