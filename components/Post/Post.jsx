import { useState, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import showdown from 'showdown';
import moment from 'moment';
import styles from './Post.module.css';
import Comments from '../Comments';

const displayCategories = (categories, handleClickFromPost) => {
  let output = '';

  if (categories.length > 0) {
    const categoryTags = categories.map((category) => (
      <li
        onClick={() => {
          handleClickFromPost(category);
        }}
        key={new Date().getTime() + category.id}
        className='categoryTag hammer'>
        #{category.Name}
      </li>
    ));

    output = <ul>{categoryTags}</ul>;
  }

  return output;
};

const Post = (props) => {
  const [expanded, setExpanded] = useState(false); //state to manage whether the post is expanded or not
  const postContent = useRef(); //ref used to get copy of post container for bandcamp/iframe fix
  const articleRef = useRef();

  const handleClick = () => {
    if (expanded) {
      articleRef.current.scrollIntoView();
    }

    //expands/un-expands post
    setExpanded(!expanded);

    //bandcamp has issues rendering album artwork in next.js and the following code is a solution.
    //this trick is also a nice way to stop playing content when a user closes the post

    //get all iframes within the current post (via ref)
    let iframes = postContent.current.getElementsByTagName('iframe');

    //loop through each iframe and reload the source
    for (let node of iframes) {
      node.src = node.src;
    }
  };

  const getPreview = (htmlString) => {
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
    const lastCharacters = ['.', '!', '?', ' ', '...', '*'];

    const long = output.length > 26 ? true : false;

    output = output.split(' ').slice(0, 26).join(' ');
    if (long && !lastCharacters.includes(output.slice(-1))) {
      output += '...';
    }
    return output;
  };

  const handleExpanded = () => {
    if (!expanded) {
      const converter = new showdown.Converter();
      const markdown = converter.makeHtml(props.postContent);
      const preview = getPreview(markdown);
      return (
        <div ref={postContent} className={'postContent'}>
          <p>{preview}</p>
        </div>
      );
    } else {
      return (
        <div ref={postContent} className='postContentExpanded'>
          <ReactMarkdown
            source={props.postContent}
            escapeHtml={false}
            transformImageUri={(uri) => uri}
            linkTarget='_blank'
          />
        </div>
      );
    }
  };

  const createdBy =
    props.author.username && props.author.username !== ''
      ? props.author.username
      : props.author.firstname + ' ' + props.author.lastname;

  const date = moment(props.date).format('MMMM Do, YYYY @ h:mma');

  return (
    <article ref={articleRef} className={expanded ? 'expanded' : ''}>
      <h3>{props.title}</h3>
      {displayCategories(props.categories, props.handleClickFromPost)}
      <Link href={'./posts/' + props.slug}>
        <a>
          <span className='postInfo'>
            Posted by {createdBy} on {date}
          </span>
        </a>
      </Link>
      {handleExpanded()}
      {props.commentsOn ? (
        <Comments postID={props.postID} expanded={expanded} />
      ) : (
        ''
      )}
      <span className='readMore hammer' onClick={() => handleClick()}>
        {expanded ? 'Read Less' : 'Read More'}
      </span>
    </article>
  );
};

export default Post;
