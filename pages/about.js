import axios from 'axios';
import Head from 'next/head';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import ReactMarkdown from 'react-markdown/with-html';
import Footer from '../components/Footer';

const About = (props) => (
  <>
    <Head>
      <title>Finals - About</title>
      <meta
        name='description'
        content={props.config.social_media_description}
      />
      <meta property='og:title' content={props.config.social_media_title} />
      <meta
        property='og:description'
        content={props.config.social_media_description}
      />
      <meta property='og:url' content='https://finals.blog/about' />
    </Head>

    <Header
      heroImgURI={props.config.hero_image?.url}
      heroLogo={props.config?.hero_logo}
      shopImg={props.config?.shop_image}
      shopURL={props.config?.shop_link}
      aboutImg={props.config?.about_image}
      tagline={props.config?.tagline}
      heroOpacity={props.config?.hero_opacity}
      shopText={props.config?.shop_link_text}
      aboutText={props.config?.about_link_text}
    />

    <ContentContainer>
      <section className='featuredContent'>
        <h2>Finals</h2>
        <h3>{props.config.tagline}</h3>
        <div className='marqueeBounce'>
          <img
            className='featuredContentImg marqueeBounceContent'
            src={
              process.env.NEXT_PUBLIC_API_ROUTE +
              props.aboutPage.about_image.url
            }
            alt={props.aboutPage.about_image.alternativeText}
          />
        </div>
        <div className='about-page-text'>
          <ReactMarkdown
            source={props.aboutPage.about_text}
            linkTarget='_blank'
          />
        </div>
      </section>
    </ContentContainer>

    <Footer termsOfUse={props.config.terms_of_use_text} />
  </>
);

export async function getServerSideProps() {
  const config = await axios.get(process.env.API_ROUTE + '/config');
  const aboutPage = await axios.get(process.env.API_ROUTE + '/about-page');

  return {
    props: {
      config: config.data,
      aboutPage: aboutPage.data,
    },
  };
}

export default About;
