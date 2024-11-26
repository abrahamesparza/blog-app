import styles from '../profile/profile.module.css';

const BlogItem = ({ title, content, timestamp }) => {
    // const formattedTimestamp = new Date(timestamp).toLocaleString();
  
    return (
      <div className={styles.listItem}>
        <h4>{title}</h4>
        <p>{content.substr(0, 40)}...</p>
        {/* <p className={styles.cardTimestamp}>{formattedTimestamp}</p> */}
      </div>
    );
  };
  
  export default BlogItem;