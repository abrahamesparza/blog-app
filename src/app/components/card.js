import styles from '../page.module.css';

const Card = ({ username, blogs, handleProfileRoute }) => {
    return (
        <div className={styles.cardContent}>
            {/* add a profile photo icon here */}
            <h2
            className={styles.blogAuthor}
            onClick={handleProfileRoute}
            >{ username }</h2>
            <p>blogs: { blogs }</p>
        </div>
    );
};

export default Card;