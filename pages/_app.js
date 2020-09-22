import Head from 'next/head';
import '../styles/styles.css';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="robots" content="noindex"></meta>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <meta property="og:image" content="https://finals.blog/finals-sm-logo.png" />
      <meta property="og:type" content="website" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
