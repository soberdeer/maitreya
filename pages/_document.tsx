import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId, jss } from 'react-jss';
import jssPluginSyntaxNested from 'jss-plugin-nested';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    jss.use(jssPluginSyntaxNested());
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <JssProvider registry={registry} generateId={generateId} jss={jss}>
              <App {...props} />
            </JssProvider>
          ),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.svg" />
          <style>{`@ import url(/arounder.ttf');`}</style>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="theme-color" content="#09201f" />
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

export default MyDocument;
