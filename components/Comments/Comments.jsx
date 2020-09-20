import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import styles from './Comments.module.css';

const Comments = props => {
    const [comments, setComments] = useState(props.comments);
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [recaptchaSize, setRecaptchaSize] = useState('normal');
    const [recaptchaPassed, setRecaptchaPassed] = useState(false);
    const recaptchaRef = useRef();

    const distributeComments = () => {
        if(comments?.length > 0) {
            return comments.map(comment => {
                const commentDate = moment(comment.created_at).format('MMMM Do, YYYY @ h:mma');

                return(
                    <div className={styles.commentContainer} key={Math.floor(Math.random() * 50000)}>
                        <span className={styles.commentText + ' rainbow'}>{comment.text}</span>
                        <span className={styles.commentText + ' rainbow'}>Posted By: {comment.name} on {commentDate}</span>
                    </div>
                );
            });
        } else {
            return '';
        }
    }

    const postComment = async e => {
        e.preventDefault();

        if(name.length === 0 || commentText.length === 0) {
            alert('Name and comment text cannot be blank...');
        } else {
            if(recaptchaPassed) {
                const result = await axios.post(process.env.NEXT_PUBLIC_API_ROUTE + '/comments', {name: name, text: commentText, article: props.postID});
                setComments([...comments, result.data]);
                setName('');
                setCommentText('');
                recaptchaRef.current.reset();
            } else {
                alert('You need to confirm you are not a bot...');   
            }
        }
    }

    useEffect(() => {
        if(window.innerWidth < 355) {
            setRecaptchaSize('compact');
        }
    }, []);

    return(
        <div className={styles.container + ((props.expanded) ? ' commentsExpanded' : ' commentsHidden')}>
            <h2 className={styles.title + ' rainbow'}>Comments</h2>

            { distributeComments() }

            <h3 className={styles.comic + ' rainbow'}>Leave a Comment</h3>
            <form>
                <label>                
                    <span className={styles.commentText + ' rainbow'}>Name</span>
                    <input value={name} onChange={e => setName(e.target.value)} className={styles.textInput + ' rainbow'} type="text"/>
                </label>

                <label>
                    <span className={styles.commentText + ' rainbow'}>Comment</span>
                    <textarea value={commentText}  onChange={e => setCommentText(e.target.value)} className={styles.commentBox + ' rainbow'}></textarea>
                </label>

                <label>
                    <ReCAPTCHA 
                        ref={recaptchaRef}
                        theme="dark"
                        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                        onChange={() => {setRecaptchaPassed(true)}} 
                        size={recaptchaSize}/>
                </label>

                <label style={{display: 'inline-block'}}>
                    <input onClick={e => postComment(e)} className={styles.submit + ' hammer'} type="image" src="/mailbox.gif" />
                </label>
            </form>
        </div>
    );
}

export default Comments;