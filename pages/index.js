import Head from 'next/head';
import ContentContainer from '../components/ContentContainer';
import FeaturedPost from '../components/FeaturedPost';

export default function Home() {
  return (
    <ContentContainer>
      <FeaturedPost />
    </ContentContainer>
  )
}
