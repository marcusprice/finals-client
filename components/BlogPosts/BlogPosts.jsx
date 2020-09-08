import styles from './BlogPosts.module.css';
import Post from '../Post';

const BlogPosts = props => {
    console.log(props.posts);

    const handleInitialPosts = () => {
        return props.posts.map(post => (
            <Post title={post.title} author={post.created_by.firstname} postContent={post.content}/>
        ))
    }

    return(
        <section className={styles.container}>
            <h2>Posts</h2>
            {handleInitialPosts()}
        </section>
    );
};

export default BlogPosts;