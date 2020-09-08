import styles from './BlogPosts.module.css';
import Post from '../Post';

const BlogPosts = props => {
    console.log(props.posts);

    return(
        <section className={styles.container}>
            <h2>Posts</h2>

        </section>
    );
};

export default BlogPosts;