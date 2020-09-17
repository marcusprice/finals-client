import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import styles from './Post.module.css';
import Comments from '../Comments';

const handleDate = date => {
    //split the date
    date = date.split('-');

    //handle the month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const theMonth = months[Number(date[1] - 1)];

    //handle the day
    let theDay = date[2] + nth(Number(date[2]));
    if(theDay[0] === '0') theDay = theDay.slice(1);

    return theMonth + ' ' + theDay + ', ' + date[0];
}

const nth = d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}

const Post = props => {
    const [expanded, setExpanded] = useState(false);    //state to manage whether the post is expanded or not
    const postContent = useRef();                       //ref used to get copy of post container for bandcamp/iframe fix

    const handleClick = () => {
        //expands/un-expands post
        setExpanded(!expanded);

        //bandcamp has issues rendering in next.js and the following is a solution
        //the following code will force a reload on all iframe sources after a user
        //expands it
        let iframes = postContent.current.getElementsByTagName("iframe");

        //handle bandcamp glitch
        for (let node of iframes) { 
            node.src = node.src;
        } 
    }

    return(
        <article className={styles.article + ' ' + ((expanded) ? 'expanded' : '')}>
            <h3>{props.title}</h3>
            <span className="postInfo">Posted by {props.author} on {handleDate(props.date)}</span>
            <div ref={postContent} className={(expanded) ? 'postContentExpanded' : 'postContent'}>
                <ReactMarkdown 
                    source={props.postContent} 
                    escapeHtml={false} 
                    transformImageUri={uri => process.env.NEXT_PUBLIC_API_ROUTE + uri}
                />
            </div>
            <Comments comments={props.comments} postID={props.postID}/>
            <span className="readMore hammer" onClick={() => handleClick()}>{(expanded) ? 'Read Less' : 'Read More'}</span>
        </article>
    );
}

export default Post;