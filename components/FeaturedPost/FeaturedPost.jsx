import styles from './FeaturedPost.module.css';
import moment from 'moment';

const FeaturedPost = props => {
    let author;

    if(props.featuredArticle.created_by?.username && props.featuredArticle.created_by?.username !== '') {
        author = props.featuredArticle.created_by.username
    } else {
        author = props.featuredArticle.created_by.firstname + ' ' + props.featuredArticle.created_by.lastname;
    }

    const featuredImageURI = (props.featuredArticle?.article?.featured_image?.url) ? process.env.NEXT_PUBLIC_API_ROUTE + props.featuredArticle.article.featured_image.url : '/placeholder.png';
    const altText = (props.featuredArticle.article?.featured_image?.alternativeText) ? props.featuredArticle.article.featured_image.alternativeText : 'gradient placeholder image';
    const title = props.featuredArticle.article.title;
    const postDate = moment(props.featuredArticle.article.created_at).format('MMMM Do, YYYY @ h:mma');

    return(
        <section className={styles.container}>
            <h2 className={styles.rainbow}>Featured Post</h2>
            <h3 className={styles.rainbow + ' hammer'}>{ title }</h3>
            <span className={styles.rainbow + ' hammer postInfo'}>Posted by { author } on { postDate }</span>
            <img className={styles.featuredImage + ' hammer'} src={ featuredImageURI } alt={ altText } />
            <span className={'readMore hammer ' + styles.rainbow}>Read More</span>
        </section>
    )
};

export default FeaturedPost;