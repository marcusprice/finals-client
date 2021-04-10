import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './BlogPosts.module.css';
import Post from '../Post';

const randomInt = () => {
  return Math.floor(Math.random() * 1000 + 1000);
};

const createPost = (post, commentsOn, handleClickFromPost) => (
  <Post
    title={post.title}
    author={post.created_by}
    postContent={post.content}
    date={post.created_at}
    comments={post.comments}
    commentsOn={commentsOn}
    postID={post.id}
    slug={post.slug}
    categories={post.categories}
    key={new Date().getTime() + randomInt()}
    handleClickFromPost={handleClickFromPost}
  />
);

const fetchPostsFromAPI = (category, numberOfPosts, delay) => {
  let uri =
    process.env.NEXT_PUBLIC_API_ROUTE +
    '/articles?published=true&_sort=created_at:DESC&_limit=5&_start=' +
    numberOfPosts;

  if (category?.Name) uri += '&categories=' + category.id;
  const delayTime = delay ? Math.floor(Math.random() * 1000 + 1000) : 0;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const posts = await axios.get(uri);
        resolve(posts);
      } catch (err) {
        reject(err);
      }
    }, delayTime);
  });
};

const getCategoryClass = (text, selected) => {
  // selected
  if (selected === undefined) {
    selected = '';
  }

  return text === selected
    ? styles.selectedCategoryText + ' rainbow'
    : styles.categoryText;
};

const BlogPosts = (props) => {
  const scrollIntoPosts = () => {
    postsHeadingRef.current.scrollIntoView();
  };

  const handleClickFromPost = (category) => {
    handleCategoryClick(category);
    scrollIntoPosts();
  };

  const postsHeadingRef = useRef();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState(
    props.posts.map((post) =>
      createPost(post, props.commentsOn, handleClickFromPost)
    )
  );

  const getPosts = async (setPosts, setHasMore, settings) => {
    const {
      category,
      numberOfPosts,
      commentsOn,
      deleteCurrentPosts,
      currentPosts,
      delay,
      categoryChange,
    } = settings;

    try {
      const posts = await fetchPostsFromAPI(category, numberOfPosts, delay);
      if (posts.data.length > 0) {
        const newPosts = posts.data.map((post) =>
          createPost(post, commentsOn, handleClickFromPost)
        );
        if (deleteCurrentPosts) {
          setPosts(newPosts);
        } else {
          setPosts(currentPosts.concat(newPosts));
        }
      } else {
        if (categoryChange) {
          setPosts([]);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error('error from getPosts:', error);
    }
  };

  useEffect(() => {
    const categoryFromQuery = router.query.category;
    if (categoryFromQuery) {
      props.categories.forEach((category) => {
        if (
          categoryFromQuery.replaceAll('%20', ' ').toLowerCase() ===
          category.Name.toLowerCase()
        ) {
          scrollIntoPosts();
          setSelectedCategory(category);
          getPosts(setPosts, setHasMore, {
            category,
            numberOfPosts: 0,
            commentsOn: props.commentsOn,
            deleteCurrentPosts: true,
            currentPosts: posts,
            delay: false,
            categoryChange: true,
          });
        }
      });
    }
  }, []);

  const handleCategoryClick = (category) => {
    const settings = {
      category,
      numberOfPosts: 0,
      commentsOn: props.commentsOn,
      deleteCurrentPosts: true,
      currentPosts: posts,
      delay: false,
      categoryChange: true,
    };

    setSelectedCategory(category);
    getPosts(setPosts, setHasMore, settings);
    setHasMore(true);

    router.push('?category=' + category.Name, undefined, { shallow: true });
  };

  const handleCategories = (categories) => (
    <ul>
      <li
        className={styles.categoryContainer + ' hammer'}
        onClick={async () => {
          const settings = {
            category: null,
            numberOfPosts: 0,
            commentsOn: props.commentsOn,
            deleteCurrentPosts: true,
            currentPosts: posts,
            delay: false,
            categoryChange: true,
          };

          setSelectedCategory(null);
          getPosts(setPosts, setHasMore, settings);
          setHasMore(true);
        }}>
        <span className={getCategoryClass('', selectedCategory?.Name)}>
          All
        </span>
      </li>
      {categories.map((category) => {
        return (
          <li
            onClick={() => {
              handleCategoryClick(category);
            }}
            className={styles.categoryContainer + ' hammer'}
            key={new Date().getTime() + randomInt()}>
            <span
              className={getCategoryClass(
                category.Name,
                selectedCategory?.Name
              )}>
              {category.Name}
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className={styles.container}>
      <h2 ref={postsHeadingRef}>Posts</h2>
      {handleCategories(props.categories)}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => {
          const settings = {
            category: selectedCategory,
            numberOfPosts: posts.length,
            commentsOn: props.commentsOn,
            deleteCurrentPosts: false,
            currentPosts: posts,
            delay: true,
            categoryChange: false,
          };

          getPosts(setPosts, setHasMore, settings);
        }}
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
