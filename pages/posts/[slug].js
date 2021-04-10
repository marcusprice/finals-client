import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import ReactMarkdown from 'react-markdown/with-html';
import showdown from 'showdown';
import moment from 'moment';
import Header from '../../components/Header';
import ContentContainer from '../../components/ContentContainer';
import Comments from '../../components/Comments';
import Footer from '../../components/Footer';

const displayCategories = (categories) => {
  let output = '';

  if (categories?.length > 0) {
    const categoryTags = categories.map((category) => (
      <li className='categoryTag'>
        <Link scroll={false} href={'/?category=' + category.Name}>
          <a>#{category.Name}</a>
        </Link>
      </li>
    ));

    output = <ul>{categoryTags}</ul>;
  }

  return output;
};

const Post = (props) => {
  const postContent = useRef(); //ref used to get copy of post container for bandcamp/iframe fix
  const getDescription = (htmlString) => {
    let output = htmlString;
    //break all html tags (and inner content) into array
    output = output.split(/\r\n|\n|\r/gm);

    //filter out all tags that are not p tags
    output = output.filter((tag) => tag.substring(0, 3) === '<p>');

    //loop through the p tags and return the first one that does not have an image tag at the beginning
    for (let i = 0; i < output.length; i++) {
      if (output[i].substring(0, 7) !== '<p><img') {
        output = output[i];
        break;
      }
    }

    //remove all inner html tags
    output = output.replace(/<(.|\n)*?>/g, '');

    const long = output.length > 26 ? true : false;

    output = output.split(' ').slice(0, 26).join(' ');
    if (
      long &&
      output.slice(-1) !== '.' &&
      output.slice(-1) !== '!' &&
      output.slice(-1) !== '?'
    ) {
      output += '...';
    }
    return output;
  };

  const createdBy =
    props.post.created_by.username && props.post.created_by.username !== ''
      ? props.post.created_by.username
      : props.post.created_by.firstname + ' ' + props.post.created_by.lastname;
  const date = moment(props.post.created_at).format('MMMM Do, YYYY @ h:mma');
  const featuredImageURI = props.post.featured_image?.url
    ? process.env.NEXT_PUBLIC_API_ROUTE + props.post.featured_image.url
    : '';
  const altText =
    featuredImageURI !== '' ? props.post.featured_image.alternativeText : '';
  const converter = new showdown.Converter();
  const markdown = converter.makeHtml(props.post.content);
  const description = getDescription(markdown);

  useEffect(() => {
    window.onload = () => {
      //bandcamp has issues rendering album artwork in next.js and the following code is a solution.
      //this trick is also a nice way to stop playing content when a user closes the post

      //get all iframes within the current post (via ref)
      let iframes = postContent.current.getElementsByTagName('iframe');

      //loop through each iframe and reload the source
      for (let node of iframes) {
        node.src = node.src;
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Finals - {props.post.title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={props.post.title} />
        <meta property='og:description' content={description} />
        <meta
          property='og:url'
          content={'https://finals.blog/posts/' + props.post.slug}
        />
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
          <article>
            <h3>{props.post.title}</h3>
            {displayCategories(props.post.categories)}
            <span className='postInfo'>
              Posted by {createdBy} on {date}
            </span>
            {featuredImageURI !== '' ? (
              <img className='postImage' src={featuredImageURI} alt={altText} />
            ) : (
              ''
            )}
            <div className='postContentExpanded' ref={postContent}>
              <ReactMarkdown
                source={props.post.content}
                escapeHtml={false}
                transformImageUri={(uri) => uri}
                linkTarget='_blank'
              />
            </div>
          </article>
          {props.config.comments ? (
            <Comments postID={props.post.id} expanded={true} />
          ) : (
            ''
          )}
        </section>
      </ContentContainer>

      <Footer termsOfUse={props.config.terms_of_use_text} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const config = await axios.get(process.env.API_ROUTE + '/config');
  const post = await axios.get(
    process.env.API_ROUTE + '/articles?slug=' + slug
  );

  return {
    props: {
      config: config?.data,
      post: post?.data[0],
    },
  };
}

export default Post;
