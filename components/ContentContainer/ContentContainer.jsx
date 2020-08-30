import styles from './ContentContainer.module.css';

const ContentContainer = props => (
    <div className={styles.container}>
        { props.children }
    </div>
);

export default ContentContainer;