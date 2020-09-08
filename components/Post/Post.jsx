import ReactMarkdown from 'react-markdown';

const Post = props => (
    <article>
        <h3>{props.title}</h3>
        <span className="postInfo">Posted by {props.author} on {props.date}</span>
        <ReactMarkdown source={props.postContent} />
        <span className="readMore hammer">Read More</span>
    </article>
);

export default Article;