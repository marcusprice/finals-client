import axios from 'axios';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';
import BlogPosts from '../components/BlogPosts';

const album = '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=4212921709/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://marcusprice.bandcamp.com/album/brain-job">Brain Job by Marcus Price</a></iframe>';

const Home = props => (
  <ContentContainer>
    <FeaturedPost />
    <BlogPosts posts={props.posts} />
  </ContentContainer>
);

export async function getStaticProps() {

  const articles = await axios.get(process.env.API_ROUTE + '/articles?_sort=date_posted:DESC&_limit=5');

  return {
    props: {
      posts: articles.data
    }
  }
}

export default Home;