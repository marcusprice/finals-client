import Head from 'next/head';
import Header from '../components/Header';
import '../styles/styles.css';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Finals - Rumored to be among the best</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>
    <Header />
    <Component {...pageProps} />
  </>
);

export default App;