import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { emotionCache } from '@src/util/emotion-cache';
import React from 'react';

const stylesServer = createStylesServer(emotionCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
      ],
    };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="shortcut icon"
            href="/favicon.svg"
            type="image/svg+xml"
            sizes="48x48 72x72 96x96 128x128 256x256 512x512"
          />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="theme-color" content="#003333" />
          <link rel="canonical" href="https://maitreya-academy.vercel.app/" />
          <meta httpEquiv="Content-Language" content="ru_RU" />
          <meta name="keywords" content="академия майтрея, академия, майтрея" />
        </Head>
        <body>
          <noscript>
            <div
              style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              <div>This page needs JavaScript. Please enable it.</div>
              <div>Эта страница требует JavaScript. Пожалуйста, включите его поддержку.</div>
            </div>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
