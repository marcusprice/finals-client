import ReactMarkdown from 'react-markdown/with-html';
import styles from './Footer.module.css';

const Footer = props => (
    <footer className={styles.footer}>
        <div className={styles.tou + " terms-of-use-container"}>
            <ReactMarkdown 
                source={props.termsOfUse} />    
        </div>   
    </footer>
);

export default Footer;