import styles from '../profile/profile.module.css';

const BlogItem = ({ title, content, timestamp, handleBlogRoute }) => {
    // const formattedTimestamp = new Date(timestamp).toLocaleString();
  
    return (
      <div className={styles.listItem}>
        <h4
        className={styles.blogTitle}
        onClick={handleBlogRoute}>{title}</h4>
        <p>{content.substr(0, 100)}...</p>
        {/* <p className={styles.cardTimestamp}>{formattedTimestamp}</p> */}
      </div>
    );
  };
  
  export default BlogItem;