import { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './BlogPosts.module.css';
import Post from '../Post';

const BlogPosts = props => {
    const [posts, setPosts] = useState(props.posts);
    const [hasMore, setHasMore] = useState(true);
    
    const fetchMorePosts = () => {
        setTimeout(async () => {
            const uri = process.env.NEXT_PUBLIC_API_ROUTE + '/articles?_sort=date_posted:DESC&_start=' + posts.length + '&_limit=5';
            console.log(uri);
            const result = await axios.get(uri);
            console.log(posts.concat(result.data));
            if(result.data.length > 0) {
                setPosts(posts.concat(result.data));
            } else {
                setHasMore(false);
            }
        }, 2000)
    }

    return(
        <section className={styles.container}>
            <h2>Posts</h2>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={<h2>Loading...</h2>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                      <b>Yay! You have seen it all</b>
                    </p>
                } >

                {
                    posts.map(post => (
                        <Post 
                            title={post.title} 
                            author={post.created_by.firstname} 
                            postContent={post.content} 
                            date={post.date_posted} 
                            key={Math.floor(Math.random() * 50000)} />
                    ))
                }


            </InfiniteScroll>
        </section>
    );
};

export default BlogPosts;