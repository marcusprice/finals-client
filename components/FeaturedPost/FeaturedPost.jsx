import styles from './FeaturedPost.module.css';
import tempFeatuedImage from '../../assets/img/fm.jpg';

const FeaturedPost = () => (
    <section className={styles.container}>
        <h2 className={styles.rainbow}>Featured Post</h2>
        <h3 className={styles.rainbow + ' hammer'}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h3>
        <span className={styles.rainbow + ' hammer postInfo'}>Posted by Spencer on 8/29/2020</span>
        <img className={styles.featuredImage + ' hammer'} src={tempFeatuedImage} alt="farmers manual"/>
        <span className={'readMore hammer ' + styles.rainbow}>Read More</span>
    </section>
);

export default FeaturedPost;