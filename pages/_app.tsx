import React, { useEffect, useMemo, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import App from 'next/app';
import { Entry } from 'contentful';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ArwesThemeProvider, StylesBaseline } from '@arwes/core';
import { AnimatorGeneralProvider } from '@arwes/animation';
import PostScribe from '@marshallku/react-postscribe';
import '../styles/globals.css';
import { getEntries, getEntry } from '../contentful/client';
import { BaseProps, UserProps } from '../util/types';
import ElementsContext from '../components/contexts/ElementsContext';
import ActivateContext from '../components/contexts/ActivateContext';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import Head from '../components/Head/Head';
import Background from '../components/Background/Background';
import { theme, grayPalette, defaultPalette } from '../util/theme';
import Footer from '../components/Footer/Footer';
import getChatScript from '../util/getChatScript';
import PaletteContext from '../components/contexts/PaletteContext';
import { NextApiRequest, NextApiResponse } from 'next';

interface AppInterface extends AppProps {
  base: Entry<BaseProps>[];
  theme: 'gray' | 'green';
  isGuest: boolean;
  isLogin: boolean;
  chatScript?: string;
}

function MyApp({
  Component,
  pageProps,
  isLogin,
  isGuest,
  base,
  chatScript,
  theme: cookieTheme = 'green',
}: AppInterface) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [activate, setActivate] = useState(false);
  const elements = useMemo(() => base?.[0].fields.elements?.map((entry) => entry.fields), [base]);
  const paletteName = useMemo(() => cookieTheme, [cookieTheme]);
  const palette = useMemo(
    () => (cookieTheme === 'green' ? defaultPalette : grayPalette),
    [cookieTheme]
  );

  const updatePalette = () => {
    document.cookie = `_maitreya_theme=${paletteName === 'green' ? 'gray' : 'green'}`;
    router.reload();
  };

  useEffect(() => {
    router.prefetch('/models');
    router.prefetch('/technics');
    router.prefetch('/articles');
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  // @ts-ignore
  // @ts-ignore
  return (
    show && (
      <>
        <Head />
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <PaletteContext.Provider value={{ paletteName, palette, setPalette: updatePalette }}>
            <ActivateContext.Provider
              value={{
                activate,
                setActivate,
              }}
            >
              <ElementsContext.Provider value={{ elements }}>
                <ArwesThemeProvider themeSettings={{ ...theme, palette }}>
                  <AnimatorGeneralProvider animator={{ duration: { enter: 200, exit: 200 } }}>
                    <StylesBaseline
                      styles={{
                        'html, body': {
                          fontFamily: 'Roboto, sans-serif',
                          transition:
                            'color 100ms ease, text-shadow 100ms ease, background-color 100ms ease',
                        },
                        'h1, h2, h3, h4, h5, h6': {
                          fontFamily: '"Arounder", sans-serif',
                          letterSpacing: '.1em',
                        },
                      }}
                    />
                    <ModalsProvider>
                      <>
                        <Background />
                        <div style={{ zIndex: 2 }}>
                          {!isLogin && <Header isGuest={isGuest} {...(base?.[0]?.fields || {})} />}
                          <div style={isLogin ? {} : { marginTop: 80, marginBottom: 80 }}>
                            <Container>
                              {/*//@ts-ignore*/}
                              <Component {...pageProps} />
                            </Container>
                          </div>
                          {!isLogin && <Footer vkUrl={base?.[0]?.fields?.vk_url} />}
                        </div>
                        {chatScript && <PostScribe html={chatScript} />}
                      </>
                    </ModalsProvider>
                  </AnimatorGeneralProvider>
                </ArwesThemeProvider>
              </ElementsContext.Provider>
            </ActivateContext.Provider>
          </PaletteContext.Provider>
        </MantineProvider>
      </>
    )
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppProps = (await App.getInitialProps(appContext)) as AppProps;
  const { req, res } = appContext.ctx;
  if (req?.url === '/sitemap.xml' || req?.url === '/robots.txt') {
    return {
      ...appProps,
    };
  }

  const userId = (req as NextApiRequest)?.cookies['_maitreya_user'] || null;
  const theme = (req as NextApiRequest)?.cookies['_maitreya_theme'] || 'green';
  const base = await getEntries<BaseProps>('main');
  const user = userId && userId !== 'guest' ? await getEntry<UserProps>(userId) : null;

  const chatScript =
    userId && userId !== 'guest'
      ? await getChatScript({
          req: req as NextApiRequest,
          res: res as NextApiResponse,
          domain: req?.headers?.host
            ? req?.headers?.host.includes('localhost')
              ? 'localhost'
              : req?.headers?.host
            : 'localhost',
          userId,
          userFullName: user?.fields?.name || null,
          isMaster: process.env.MASTER_ID === user?.sys?.id,
          secretKey: process.env.CHAT_SECRET_KEY!,
          avatar: user?.fields?.avatar_chat?.fields?.file?.url || null,
          color: user?.fields?.avatar_chat?.fields?.description || null,
        })
      : null;

  return {
    ...appProps,
    base: base,
    isGuest: userId === 'guest',
    isLogin: !userId,
    theme,
    chatScript,
  };
};

export default MyApp;
