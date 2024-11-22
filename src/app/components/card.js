import styles from '../page.module.css';

const Card = ({ username, blogs }) => {
    return (
        <div className={styles.cardContent}>
            <h2>Author: { username }</h2>
            <p>blog count: { blogs }</p>
        </div>
    );
};

export default Card;