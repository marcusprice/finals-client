import styles from './BlogPosts.module.css';

const BlogPosts = () => (
    <section className={styles.container}>
        <h2>Posts</h2>
        <article className={styles.blogPost}>
            <h3>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Tellus elementum sagittis vitae et leo duis ut diam quam. A erat nam at lectus urna.</h3>
            <span className="postInfo">Posted by Andrew on 8/25/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Etiam non quam lacus suspendisse faucibus interdum posuere.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Nullam eget felis eget nunc.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Habitant morbi tristique senectus et netus et malesuada fames ac.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Imperdiet nulla malesuada pellentesque elit eget gravida sociis.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>
    </section>
);

export default BlogPosts;