import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';

const Home = () => (
  <ContentContainer>
    <FeaturedPost />
    <BlogPosts />
  </ContentContainer>
);

export default Home;