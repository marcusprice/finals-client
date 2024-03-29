import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Finals - {props.config.tagline}</title>
        <meta
          name='description'
          content={props.config.social_media_description}
        />
        <meta property='og:title' content={props.config.social_media_title} />
        <meta
          property='og:description'
          content={props.config.social_media_description}
        />
        <meta property='og:url' content='https://finals.blog' />
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
        <FeaturedPost
          commentsOn={props.config.comments}
          featuredArticle={props.featuredArticle}
        />
        <BlogPosts
          categories={props.categories}
          commentsOn={props.config.comments}
          posts={props.posts}
        />
      </ContentContainer>

      <Footer termsOfUse={props.config.terms_of_use_text} />
    </>
  );
};

export async function getServerSideProps(context) {
  let config,
    articles,
    featuredArticleContentType,
    featuredArticle,
    categories,
    articlesURL =
      process.env.API_ROUTE +
      '/articles?published=true&_sort=created_at:DESC&_limit=5';

  try {
    config = await axios.get(process.env.API_ROUTE + '/config');
    categories = await axios.get(process.env.API_ROUTE + '/categories');

    if (context.query.category) {
      const alteredQuery = context.query.category
        .replace(/%20/g, ' ')
        .toLowerCase();

      categories.data.forEach((category) => {
        if (category.Name.toLowerCase() === alteredQuery) {
          articlesURL += '&categories=' + category.id;
        }
      });
    }
    articles = await axios.get(articlesURL);

    featuredArticleContentType = await axios.get(
      process.env.API_ROUTE + '/featured-article'
    );

    //handle featured article
    if (featuredArticleContentType.data.article) {
      //if a featured article is set, use it
      featuredArticle = await axios.get(
        process.env.API_ROUTE +
          '/articles?id=' +
          featuredArticleContentType.data.article.id
      );
    } else {
      //otherwise grab the most recent published post
      featuredArticle = await axios.get(
        process.env.API_ROUTE +
          '/articles?published=true&_sort=created_at:DESC&_limit=5'
      );
      if (!featuredArticle.data[0]) {
        //there are no published posts, so use the most recent post that was made
        featuredArticle = await axios.get(process.env.API_ROUTE + '/articles');
      }
    }
  } catch (error) {
    config = [];
    articles = [];
    featuredArticleContentType = [];
    featuredArticle = [];
    categories = [];
  }

  return {
    props: {
      config: config?.data,
      posts: articles?.data,
      featuredArticle: featuredArticle?.data[0],
      categories: categories.data,
    },
  };
}

export default Home;
