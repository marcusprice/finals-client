import axios from 'axios';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';

const Home = props => (
  <ContentContainer>
    <FeaturedPost />
    <BlogPosts posts={props.posts} />
  </ContentContainer>
);

export async function getStaticProps() {
  const articles = await axios.get(process.env.API_ROUTE + '/articles');
  return {
    props: {
      posts: articles.data
    }
  }
}

export default Home;