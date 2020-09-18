import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import styles from './Comments.module.css';
import signGuestbook, { codePointAt } from '../../assets/img/sign-guestbook.gif';

const Comments = props => {
    const [comments, setComments] = useState(props.comments);
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const handleComments = () => {
        if(comments?.length > 0) {
            return comments.map(comment => {
                const commentDate = moment(comment.created_at).format('MMMM Do, YYYY @ h:mma');

                return(
                    <div className={styles.commentContainer} key={Math.floor(Math.random() * 50000)}>
                        <span className={styles.commentText + ' rainbow'}>Comment: {comment.text}</span>
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
        const result = await axios.post(process.env.NEXT_PUBLIC_API_ROUTE + '/comments', {name: name, text: commentText, article: props.postID});
        setComments([...comments, result.data]);
        setName('');
        setCommentText('');
    }

    return(
        <div className={styles.container + ((props.expanded) ? ' commentsExpanded' : ' commentsHidden')}>
            <h2 className={styles.title + ' rainbow'}>Comments</h2>

            { handleComments() }

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

                <label style={{display: 'inline-block'}}>
                    <input onClick={e => postComment(e)} className={styles.submit + ' hammer'} type="image" src={signGuestbook} />
                </label>
            </form>
        </div>
    );
}

export default Comments;