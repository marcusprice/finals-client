import styles from './BlogPosts.module.css';
import newGif from '../../assets/img/new.gif';
import img1 from '../../assets/img/img1.jpg';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.jpg';
import img4 from '../../assets/img/img4.jpg';
import img5 from '../../assets/img/img5.jpg';
import img6 from '../../assets/img/img6.jpg';
import img7 from '../../assets/img/img7.jpg';
import img8 from '../../assets/img/img8.jpg';

const BlogPosts = () => (
    <section className={styles.container}>
        <h2>Posts</h2>
        <article className={styles.blogPost}>
            <h3>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat <img src={newGif}/></h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img1} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
            <span className="readMore hammer">Read More</span>
        </article>

        <article className={styles.blogPost}>
            <h3>Tellus elementum sagittis vitae et leo duis ut diam quam. A erat nam at lectus urna.</h3>
            <span className="postInfo">Posted by Andrew on 8/25/2020</span>
            <img className={styles.postImage} src={img2} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
            <span className="readMore hammer">Read More</span>
        </article>

        <article className={styles.blogPost}>
            <h3>Etiam non quam lacus suspendisse faucibus interdum posuere.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img3} />
            <p>Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Adipiscing elit pellentesque habitant morbi tristique senectus. Massa sapien faucibus et molestie. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Praesent semper feugiat nibh sed pulvinar proin. Morbi leo urna molestie at elementum eu facilisis. Congue quisque egestas diam in arcu cursus euismod. Ut sem nulla pharetra diam. Sit amet facilisis magna etiam tempor. Eleifend donec pretium vulputate sapien. Blandit turpis cursus in hac habitasse. Tellus at urna condimentum mattis.</p>

            <p>Nulla pellentesque dignissim enim sit amet. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Congue nisi vitae suscipit tellus mauris a. Mattis rhoncus urna neque viverra justo nec ultrices. Ac placerat vestibulum lectus mauris ultrices eros. Id aliquet lectus proin nibh nisl condimentum id venenatis. Eu ultrices vitae auctor eu augue ut. Vestibulum sed arcu non odio euismod lacinia at quis risus. Pharetra et ultrices neque ornare aenean. Massa placerat duis ultricies lacus sed turpis tincidunt.</p>
            <img className={styles.postImage} src={img8} />

            <p>Purus faucibus ornare suspendisse sed nisi. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Bibendum neque egestas congue quisque egestas. Viverra aliquet eget sit amet tellus cras adipiscing. Mauris augue neque gravida in fermentum et sollicitudin ac orci. Hendrerit gravida rutrum quisque non tellus orci. Posuere ac ut consequat semper. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Nascetur ridiculus mus mauris vitae ultricies. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Velit egestas dui id ornare arcu odio ut sem. A erat nam at lectus urna duis. Faucibus a pellentesque sit amet porttitor eget dolor. Consectetur lorem donec massa sapien faucibus et. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>

            <p>Morbi tincidunt ornare massa eget egestas purus. Augue interdum velit euismod in pellentesque massa. Imperdiet proin fermentum leo vel orci porta non. Lectus urna duis convallis convallis tellus id interdum. Donec adipiscing tristique risus nec feugiat in. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Integer quis auctor elit sed vulputate mi sit. Dictum fusce ut placerat orci. Senectus et netus et malesuada fames ac turpis egestas sed. Ac felis donec et odio pellentesque diam volutpat commodo sed.</p>

            <p>Ante metus dictum at tempor commodo. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices. Pretium quam vulputate dignissim suspendisse in est. Blandit libero volutpat sed cras ornare arcu dui. At auctor urna nunc id cursus metus aliquam eleifend. Egestas congue quisque egestas diam. Fusce id velit ut tortor pretium. Tortor dignissim convallis aenean et tortor. Sodales ut eu sem integer vitae justo. Faucibus et molestie ac feugiat. Placerat orci nulla pellentesque dignissim. Interdum velit euismod in pellentesque massa placerat.</p>
            <span className="readMore hammer">Read Less</span>
        </article>

        <article className={styles.blogPost}>
            <h3>Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img4} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
            <span className="readMore hammer">Read More</span>
        </article>

        <article className={styles.blogPost}>
            <h3>Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Nullam eget felis eget nunc.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img5} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
            <span className="readMore hammer">Read More</span>
        </article>

        <article className={styles.blogPost}>
            <h3>Habitant morbi tristique senectus et netus et malesuada fames ac.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img6} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
        </article>

        <article className={styles.blogPost}>
            <h3>Imperdiet nulla malesuada pellentesque elit eget gravida sociis.</h3>
            <span className="postInfo">Posted by Spencer on 8/29/2020</span>
            <img className={styles.postImage} src={img7} />
            <p>
            Pretium aenean pharetra magna ac placerat vestibulum. Auctor elit sed vulputate mi sit. Quam adipiscing vitae proin sagittis. At risus viverra adipiscing at in tellus integer feugiat...
            </p>
            <span className="readMore hammer">Read More</span>
        </article>
    </section>
);

export default BlogPosts;