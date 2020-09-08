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
  const articles = await axios.get('http://locahost:1337/articles');
  return {
    props: {
      posts: articles
    }
  }
}

export default Home;