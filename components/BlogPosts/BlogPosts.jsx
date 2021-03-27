import { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './BlogPosts.module.css';
import Post from '../Post';

const BlogPosts = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState(
    props.posts.map((post) => (
      <Post
        title={post.title}
        author={post.created_by}
        postContent={post.content}
        date={post.created_at}
        comments={post.comments}
        commentsOn={props.commentsOn}
        postID={post.id}
        slug={post.slug}
        key={Math.floor(Math.random() * 50000)}
      />
    ))
  );

  const handleCategories = (categories) => {
    let output = '';
    if (categories.length > 0) {
      output = (
        <ul>
          {categories.map((category) => {
            const textClass =
              selectedCategory === category
                ? styles.selectedCategoryText + ' rainbow'
                : styles.categoryText;

            return (
              <li
                onClick={() => {
                  console.log();
                  setSelectedCategory(category);
                }}
                className={styles.categoryContainer + ' hammer'}
                key={Math.floor(Math.random() * 50000)}>
                <span className={textClass}>{category}</span>
              </li>
            );
          })}
        </ul>
      );
    } else {
    }

    return output;
  };

  const fetchMorePosts = () => {
    setTimeout(async () => {
      const uri =
        process.env.NEXT_PUBLIC_API_ROUTE +
        '/articles?published=true&_sort=created_at:DESC&_start=' +
        posts.length +
        '&_limit=5';
      const result = await axios.get(uri);
      if (result.data.length > 0) {
        setPosts(
          posts.concat(
            result.data.map((post) => (
              <Post
                title={post.title}
                author={post.created_by}
                postContent={post.content}
                date={post.created_at}
                comments={post.comments}
                commentsOn={props.commentsOn}
                postID={post.id}
                slug={post.slug}
                key={Math.floor(Math.random() * 50000)}
              />
            ))
          )
        );
      } else {
        setHasMore(false);
      }
    }, Math.floor(Math.random() * 1000) + 1000);
  };

  return (
    <section className={styles.container}>
      <h2>Posts</h2>
      {handleCategories(props.categories)}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={
          <img
            className={styles.loadingGif}
            src='/loading.gif'
            alt='loading sign'
          />
        }
        endMessage={
          <img
            className={styles.loadingGif}
            src='/endMessage.gif'
            alt='more coming soon gif'
          />
        }>
        {posts}
      </InfiniteScroll>
    </section>
  );
};

export default BlogPosts;
