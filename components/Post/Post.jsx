import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.css';

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
    const [expanded, setExpanded] = useState(false);

    return(
        <article className={styles.article + ' ' + ((expanded) ? 'expanded' : '')}>
            <h3>{props.title}</h3>
            <span className="postInfo">Posted by {props.author} on {handleDate(props.date)}</span>
            <div className={(expanded) ? 'postContentExpanded' : 'postContent'}>
                <ReactMarkdown source={props.postContent} escapeHtml={false} transformImageUri={uri => process.env.NEXT_PUBLIC_API_ROUTE + uri}/>
            </div>
            <span className="readMore hammer" onClick={() => setExpanded(!expanded)}>{(expanded) ? 'Read Less' : 'Read More'}</span>
        </article>
    );
}

export default Post;