import Header from '../components/Header';
import '../styles/styles.css';

const App = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default App;
