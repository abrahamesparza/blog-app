import styles from '../profile/profile.module.css';

const BlogItem = ({ title, content, timestamp, handleBlogRoute }) => {
    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  
    return (
      <div className={styles.listItem}>
        <div className={styles.titleTime}>
          <h3
          className={styles.blogTitle}
          onClick={handleBlogRoute}>{title}</h3>
          <p className={styles.cardTimestamp}>{formattedTimestamp}</p>
        </div>
        <p>{content.substr(0, 100)}...</p>
      </div>
    );
  };
  
  export default BlogItem;