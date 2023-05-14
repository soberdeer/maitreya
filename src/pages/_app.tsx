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
  isLogin,
  isGuest,
  base: initialBase,
  animate: animateInitial,
  chatScript,
}: AppInterface) {
  const [animate, setAnimate] = useState(animateInitial);
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

  return (
    <div style={{ height: '100vh' }}>
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
          >
            <GlobalStyles />
            <AnimatorGeneralProvider {...animatorsSettings} disabled={!animate}>
              <Head>
                <Meta />
              </Head>
              <Animator combine manager="stagger">
                <Header
                  menu={base?.fields.menu as { href: string; children: string; icon: string }[]}
                  vkUrl={base?.fields.vk_url}
                />
                <Box component="main" className={roboto.className} sx={{ paddingTop: 100, paddingBottom: 50 }}>
                  <Background />
                  <Container sx={{ zIndex: 1 }}>
                    {/*@ts-ignore*/}
                    <Component {...pageProps} />
                  </Container>
                </Box>
              </Animator>
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
    isLogin: !userId,
    chatScript,
    animate: typeof animate === 'string' ? animate === 'true' : true,
  };
};

export default MaitreyaApp;
