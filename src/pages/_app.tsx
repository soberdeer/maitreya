import React, { useEffect, useMemo, useState } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import { Box, Container, MantineProvider } from '@mantine/core';
import {
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  Animator,
} from '@arwes/react';
import { ModalsProvider } from '@mantine/modals';
import { GlobalStyles } from '@src/util/globals';
import { NextApiRequest, NextApiResponse, NextPage } from 'next';
import PostScribe from '@marshallku/react-postscribe';
import { Analytics } from '@vercel/analytics/react';
import { getEntries, getEntry } from '@src/contentful';
import getChatScript from '@src/util/getChatScript';
import { TypeElementsFields, TypeMain, TypeMainSkeleton, TypeUsersSkeleton } from '@src/util/types';
import { mantineTheme } from '@src/util/mantineTheme';
import { Background } from '@src/components/Background';
import { Header } from '@src/components/Header';
import { ElementsProvider } from '@src/hooks/use-elements';
import { AnimateProvider } from '@src/hooks/use-animate';
import { Meta } from '@src/components/Meta';
import SpotlightProvider from '@src/components/SpotlightProvider/SpotlightProvider';
import { Loader } from '@src/components/Loader';
import { emotionCache } from '@src/util/emotion-cache';

interface AppInterface extends AppProps {
  Component: NextPage;
  base: TypeMain | null;
  theme: 'gray' | 'green';
  isGuest: boolean;
  isLogin: boolean;
  chatScript?: string;
  animate: boolean;
  enableChat?: boolean;
}

const animatorsSettings: AnimatorGeneralProviderSettings = {
  duration: {
    enter: 0.2,
    exit: 0.2,
    stagger: 0.04,
  },
};

export function MaitreyaApp({
  Component,
  pageProps,
  isGuest,
  base: initialBase,
  animate: animateInitial,
  chatScript,
  enableChat,
}: AppInterface) {
  const [animate, setAnimate] = useState(animateInitial);
  const [active, setActive] = useState(true);
  const base = useMemo(() => initialBase, []);
  const router = useRouter();
  const toggleAnimate = () => {
    setCookie('_maitreya_animate', animate);
    setAnimate((p) => !p);
  };

  useEffect(() => {
    router.prefetch('/models');
    router.prefetch('/technics');
    router.prefetch('/articles');
    router.prefetch('/');
  }, []);

  useEffect(() => {
    const start = (e: any[]) => {
      if (!e.includes('/technics?')) {
        setActive(false);
      }
    };
    const end = (e: any[]) => {
      if (!e.includes('/technics?')) {
        setActive(true);
      }
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
    };
  }, [router]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={mantineTheme}
      emotionCache={emotionCache}
    >
      <GlobalStyles />
      <div style={{ height: '100vh' }}>
        <Analytics />
        <AnimateProvider animate={animate} toggleAnimate={toggleAnimate}>
          <ElementsProvider
            elements={
              base?.fields.elements?.map((entry) => entry?.fields as TypeElementsFields) || []
            }
          >
            <AnimatorGeneralProvider {...animatorsSettings} disabled={!animate}>
              <Head>
                <Meta />
              </Head>
              <SpotlightProvider router={router}>
                <ModalsProvider>
                  {/*<Box sx={{ position: 'fixed', right: 30, bottom: 60, zIndex: 1000 }}>*/}
                  {/*  <Button onClick={() => setActive((a) => !a)}>*/}
                  {/*    {active ? 'deactivate' : 'activate'}*/}
                  {/*  </Button>*/}
                  {/*</Box>*/}
                  <Animator active={!active}>
                    <Box
                      sx={{
                        position: 'fixed',
                        right: '1rem',
                        bottom: '1rem',
                        zIndex: 1000,
                      }}
                    >
                      <Loader small />
                    </Box>
                  </Animator>
                  <Header
                    menu={base?.fields.menu as { href: string; children: string; icon: string }[]}
                    vkUrl={base?.fields.vk_url}
                    isGuest={isGuest}
                  />
                  <Animator combine manager="stagger" active={active}>
                    <Box
                      component="main"
                      sx={{ height: '100vh', paddingTop: 100, paddingBottom: 50 }}
                    >
                      <Background />
                      <Container sx={{ zIndex: 1, height: '100%' }}>
                        {/*@ts-ignore*/}
                        <Component {...pageProps} />
                      </Container>
                    </Box>
                  </Animator>
                  {enableChat && chatScript && <PostScribe html={chatScript} />}
                </ModalsProvider>
              </SpotlightProvider>
            </AnimatorGeneralProvider>
          </ElementsProvider>
        </AnimateProvider>
      </div>
    </MantineProvider>
  );
}

MaitreyaApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppProps = (await App.getInitialProps(appContext)) as AppProps;
  const { req, res } = appContext.ctx;
  if (req?.url === '/sitemap.xml' || req?.url === '/robots.txt') {
    return {
      ...appProps,
    };
  }

  deleteCookie('_maitreya_animate', appContext.ctx);
  const userId = (req as NextApiRequest)?.cookies._maitreya_user || null;
  if (userId === 'guest') {
    deleteCookie('_maitreya_user', appContext.ctx);
  }
  // const theme = (req as NextApiRequest)?.cookies._maitreya_theme || 'green';
  const animate = (req as NextApiRequest)?.cookies._maitreya_animate || null;
  const base = await getEntries<TypeMainSkeleton>('main');
  const user = userId && userId !== 'guest' ? await getEntry<TypeUsersSkeleton>(userId) : null;

  const chatScript =
    userId && userId !== 'guest' && process.env.ENABLE_CHAT === 'true'
      ? await getChatScript({
          req: req as NextApiRequest,
          res: res as NextApiResponse,
          domain: req?.headers?.host
            ? req?.headers?.host.includes('localhost')
              ? 'localhost'
              : req?.headers?.host
            : 'localhost',
          userId,
          userFullName: (user?.fields?.name as string) || null,
          isMaster: process.env.MASTER_ID === user?.sys?.id,
          secretKey: process.env.CHAT_SECRET_KEY!,
          avatar: user?.fields?.avatar_chat?.fields.file?.url || null,
          color: user?.fields?.avatar_chat?.fields?.description || null,
        })
      : null;

  return {
    ...appProps,
    base: base ? base[0] || null : null,
    isGuest: !userId || userId === 'guest',
    chatScript,
    animate: typeof animate === 'string' ? animate === 'true' : true,
    enableChat: process.env.ENABLE_CHAT === 'true',
  };
};

export default MaitreyaApp;
