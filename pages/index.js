import Head from 'next/head';
import axios from 'axios';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';

const Home = props => {

  return (
    <>
    <Head>
      <title>Finals - {props.config.tagline}</title>
      <meta name="description" content={props.config.social_media_description} />
      <meta property="og:title" content={props.config.social_media_title} />
      <meta property="og:description" content={props.config.social_media_description} />
      <meta property="og:url" content="https://finals.blog" />
    </Head>

      <Header 
        heroImgURI={props.config.hero_image.url} 
        heroLogo={props.config.hero_logo}
        shopImg={props.config.shop_image}
        shopURL={props.config.shop_link}
        aboutImg={props.config.about_image}
        tagline={props.config.tagline} 
        heroOpacity={props.config.hero_opacity} />

      <ContentContainer>
        <FeaturedPost commentsOn={props.config.comments} featuredArticle={props.featuredArticle} />
        <BlogPosts commentsOn={props.config.comments} posts={props.posts} />
      </ContentContainer>

      <Footer termsOfUse={props.config.terms_of_use_text} />
    </>
)};

export async function getServerSideProps() {

  const config = await axios.get(process.env.API_ROUTE + '/config');
  const articles = await axios.get(process.env.API_ROUTE + '/articles?_sort=created_at:DESC&_limit=5');
  const featuredArticle = await axios.get(process.env.API_ROUTE + '/featured-article');

  return {
    props: {
      config: config.data,
      posts: articles.data,
      featuredArticle: featuredArticle.data
    }
  }
}

export default Home;