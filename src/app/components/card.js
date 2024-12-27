import styles from '../page.module.css';

const Card = ({ username, title, content, timestamp, handleProfileRoute }) => {
    return (
        <div className={styles.cardContent}>
            {/* add a profile photo icon here */}
            <h2
            className={styles.blogAuthor}
            onClick={handleProfileRoute}
            >{ username }</h2>
            <h2
            className={styles.blogAuthor}
            onClick={handleProfileRoute}
            >{ title }</h2>
            <h2
            className={styles.blogAuthor}
            onClick={handleProfileRoute}
            >{ content }</h2>
            <h2
            className={styles.blogAuthor}
            onClick={handleProfileRoute}
            >{ timestamp }</h2>
            {/* <p>blogs: { blogs }</p> */}
        </div>
    );
};

export default Card;