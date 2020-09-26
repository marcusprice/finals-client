import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import showdown from 'showdown';
import moment from 'moment';
import styles from './Post.module.css';
import Comments from '../Comments';

const Post = props => {
    const [expanded, setExpanded] = useState(false);    //state to manage whether the post is expanded or not
    const postContent = useRef();                       //ref used to get copy of post container for bandcamp/iframe fix

    const date = moment(props.date).format('MMMM Do, YYYY @ h:mma');

    const handleClick = () => {
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
    }


    //break all html tags (and inner content) into array
    
    //filter out all tags that are not p tags

    //loop through the p tags and return the first one that does not have an html tag inside it (text only)

    //reduce the text in p tag to be only 55 words

    //add ... at the end of it

    const convertTagsToArray = html => {
        const elements = html.split(/<[a-zA-Z0-9]*>([^<.*>;]*)<\/[a-zA-Z0-9]*>/gmi);
        return elements;
    }

    const converter = new showdown.Converter();
    const markdown = converter.makeHtml(props.postContent);
    console.log(convertTagsToArray(markdown));
    

    const createdBy = (props.author.username && props.author.username !== '') ? props.author.username : props.author.firstname + ' ' + props.author.lastname;

    return(
        <article className={styles.article + ' ' + ((expanded) ? 'expanded' : '')}>
            <h3>{props.title}</h3>
            <span className="postInfo">Posted by { createdBy } on {date}</span>
            <div ref={postContent} className={(expanded) ? 'postContentExpanded' : 'postContent'}>
                <ReactMarkdown 
                    source={props.postContent} 
                    escapeHtml={false} 
                    transformImageUri={uri => process.env.NEXT_PUBLIC_API_ROUTE + uri}
                />
            </div>
            {(props.commentsOn) ? <Comments postID={props.postID} expanded={expanded}/> : ''}
            <span className="readMore hammer" onClick={() => handleClick()}>{(expanded) ? 'Read Less' : 'Read More'}</span>
        </article>
    );
}

export default Post;