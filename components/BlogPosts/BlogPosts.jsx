import styles from './BlogPosts.module.css';
import Post from '../Post';

const BlogPosts = props => {
    console.log(props.posts);

    const handleInitialPosts = () => {
        return props.posts.map(post => (
            <Post 
                title={post.title} 
                author={post.created_by.firstname} 
                postContent={post.content} 
                date={post.date_posted} 
                key={Math.floor(Math.random() * 50000)} />
        ))
    }

    return(
        <section className={styles.container}>
            <h2>Posts</h2>
            { handleInitialPosts() }
        </section>
    );
};

export default BlogPosts;