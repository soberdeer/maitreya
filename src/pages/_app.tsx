import React, { useEffect, useMemo, useState } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Box, Container, MantineProvider } from '@mantine/core';
import { Roboto } from 'next/font/google';
import {
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  Animator,
} from '@arwes/react';
import { GlobalStyles } from '@src/styles';
import { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { getEntries, getEntry } from '@src/contentful';
import getChatScript from '@src/util/getChatScript';
import { TypeElementsFields, TypeMain, TypeMainSkeleton, TypeUsersSkeleton } from '@src/util/types';
import { mantineTheme } from '@src/util/mantineTheme';
import { Background } from '@src/components/Background';
import { Header } from '@src/components/Header';
import { ElementsProvider } from '@src/hooks/use-elements';
import { AnimateProvider } from '@src/hooks/use-animate';
import { useRouter } from 'next/router';
import { Meta } from '@src/components/Meta';
import SpotlightProvider from '@src/components/SpotlightProvider/SpotlightProvider';
import { Loader } from '@src/components/Loader';
import PostScribe from '@marshallku/react-postscribe';
import { rtlCache } from '@src/util/rtl-cache';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '700'],
  style: ['normal'],
});

interface AppInterface extends AppProps {
  Component: NextPage;
  base: TypeMain | null;
  theme: 'gray' | 'green';
  isGuest: boolean;
  isLogin: boolean;
  chatScript?: string;
  animate: boolean;
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
  base: initialBase,
  animate: animateInitial,
  chatScript,
}: AppInterface) {
  const [animate, setAnimate] = useState(animateInitial);
  const [active, setActive] = useState(true);
  const base = useMemo(() => initialBase, []);
  const router = useRouter();
  const toggleAnimate = () => {
    document.cookie = `_maitreya_animate=${!animate}`;
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
    <div dir="rtl" style={{ height: '100vh' }}>
      <AnimateProvider animate={animate} toggleAnimate={toggleAnimate}>
        <ElementsProvider
          elements={
            base?.fields.elements?.map((entry) => entry?.fields as TypeElementsFields) || []
          }
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={mantineTheme}
            emotionCache={rtlCache}
          >
            <GlobalStyles />
            <AnimatorGeneralProvider {...animatorsSettings} disabled={!animate}>
              <Head>
                <Meta />
              </Head>
              <SpotlightProvider router={router}>
                {/*<Box sx={{ position: 'fixed', right: 30, bottom: 60, zIndex: 1000 }}>*/}
                {/*  <Button onClick={() => setActive((a) => !a)}>*/}
                {/*    {active ? 'deactivate' : 'activate'}*/}
                {/*  </Button>*/}
                {/*</Box>*/}
                <Animator active={!active}>
                  <Box sx={{ position: 'fixed', right: 30, bottom: 30, zIndex: 1000 }}>
                    <Loader small />
                  </Box>
                </Animator>
                <Header
                  menu={base?.fields.menu as { href: string; children: string; icon: string }[]}
                  vkUrl={base?.fields.vk_url}
                />
                <Animator combine manager="stagger" active={active}>
                  <Box
                    component="main"
                    className={roboto.className}
                    sx={{ height: '100vh', paddingTop: 100, paddingBottom: 50 }}
                  >
                    <Background />
                    <Container sx={{ zIndex: 1, height: '100%' }}>
                      {/*@ts-ignore*/}
                      <Component {...pageProps} />
                    </Container>
                  </Box>
                </Animator>
                {chatScript && <PostScribe html={chatScript} />}
              </SpotlightProvider>
            </AnimatorGeneralProvider>
          </MantineProvider>
        </ElementsProvider>
      </AnimateProvider>
    </div>
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

  const userId = (req as NextApiRequest)?.cookies._maitreya_user || null;
  // const theme = (req as NextApiRequest)?.cookies._maitreya_theme || 'green';
  const animate = (req as NextApiRequest)?.cookies._maitreya_animate || null;
  const base = await getEntries<TypeMainSkeleton>('main');
  const user = userId && userId !== 'guest' ? await getEntry<TypeUsersSkeleton>(userId) : null;

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
    isGuest: userId === 'guest',
    chatScript,
    animate: typeof animate === 'string' ? animate === 'true' : true,
  };
};

export default MaitreyaApp;
