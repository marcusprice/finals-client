import axios from 'axios';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';

const Home = props => {

  console.log(props.config);

  return (
    <>
      <Header 
        heroImgURI={props.config.hero_image.url} 
        heroLogo={props.config.hero_logo}
        shopImg={props.config.shop_image}
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

export async function getStaticProps() {

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