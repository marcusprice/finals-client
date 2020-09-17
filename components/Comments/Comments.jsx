import { useState } from 'react';
import axios from 'axios';
import styles from './Comments.module.css';
import signGuestbook, { codePointAt } from '../../assets/img/sign-guestbook.gif';

const Comments = props => {
    const [comments, setComments] = useState(props.comments);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleComments = () => {
        if(comments?.length > 0) {
            return comments.map(comment => {
                return(
                    <div className={styles.commentContainer} key={Math.floor(Math.random() * 50000)}>
                        <span className={styles.commentText + ' rainbow'}>Comment: {comment.text}</span>
                        <span className={styles.commentText + ' rainbow'}>Posted By: {comment.name}</span>
                    </div>
                );
            });
        } else {
            return '';
        }
    }

    const postComment = async e => {
        e.preventDefault();
        const result = await axios.post(process.env.NEXT_PUBLIC_API_ROUTE + '/comments', {name: name, text: comment, article: props.postID});
        setComments([...comments, result.data]);
    }

    return(
        <div className={styles.container}>
            <h2 className="rainbow">Guestbook</h2>
            { handleComments() }
            <h3 className={styles.comic + ' rainbow'}>Sign the Guestbook</h3>
            <form>
                <label>                
                    <span className={styles.commentText + ' rainbow'}>Name</span>
                    <input text={name} onChange={e => setName(e.target.value)} className={styles.textInput + ' rainbow'} type="text"/>
                </label>

                <label>
                    <span className={styles.commentText + ' rainbow'}>Comment</span>
                    <textarea text={comment}  onChange={e => setComment(e.target.value)} className={styles.commentBox + ' rainbow'}></textarea>
                </label>

                <label>
                    <input onClick={e => postComment(e)} className={styles.submit + ' hammer'} type="image" src={signGuestbook} />
                </label>
            </form>
        </div>
    );
}

export default Comments;