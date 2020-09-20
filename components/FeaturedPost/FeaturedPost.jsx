import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './FeaturedPost.module.css';
import moment from 'moment';
import ReactMarkdown from 'react-markdown/with-html';
import Comments from '../Comments';

const FeaturedPost = props => {

    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const postContent = useRef();

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

    let author;

    if(props.featuredArticle.created_by?.username && props.featuredArticle.created_by?.username !== '') {
        author = props.featuredArticle.created_by.username
    } else {
        author = props.featuredArticle.created_by.firstname + ' ' + props.featuredArticle.created_by.lastname;
    }

    const featuredImageURI = (props.featuredArticle?.article?.featured_image?.url) ? process.env.NEXT_PUBLIC_API_ROUTE + props.featuredArticle.article.featured_image.url : '/placeholder.png';
    const altText = (props.featuredArticle.article?.featured_image?.alternativeText) ? props.featuredArticle.article.featured_image.alternativeText : 'gradient placeholder image';
    const title = props.featuredArticle.article.title;
    const postDate = moment(props.featuredArticle.article.created_at).format('MMMM Do, YYYY @ h:mma');

    useEffect(() => {
        const fetchData = async () => {
            //get comments
            const comments = await axios.get(process.env.NEXT_PUBLIC_API_ROUTE + '/comments?_sort=created_at:ASC&article=' + props.featuredArticle.article.id);
            setComments(comments.data)
        }
        fetchData();
    }, []);

    console.log(comments);

    return(
        <section className={styles.container}>
            <h2 className={styles.rainbow}>Featured Post</h2>
            <h3 className={styles.rainbow + ' hammer'}>{ title }</h3>
            <span className={styles.rainbow + ' hammer postInfo'}>Posted by { author } on { postDate }</span>
            <img className={styles.featuredImage + ' hammer'} src={ featuredImageURI } alt={ altText } />
            <div ref={postContent} className={((expanded) ? 'postContentExpanded' : 'featuredPostContent')}>
                <ReactMarkdown 
                        source={props.featuredArticle.article.content} 
                        escapeHtml={false} 
                        transformImageUri={uri => process.env.NEXT_PUBLIC_API_ROUTE + uri} />
            </div>
            {(props.commentsOn) ? <Comments postID={props.featuredArticle.article.id} expanded={expanded}/> : ''}
            <span className={'readMore hammer ' + styles.rainbow} onClick={() => handleClick()}>{(expanded) ? 'Read Less' : 'Read More'}</span>
        </section>
    )
};

export default FeaturedPost;