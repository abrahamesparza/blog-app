import styles from '../profile/profile.module.css';
import { useRouter } from 'next/navigation';

const BlogItem = ({ author, title, content, timestamp, handleBlogRoute }) => {
  const router = useRouter();

    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const handleNavigation = (username) => {
      router.push(`/profile/${username}`);
    }
  
    return (
      <div className={styles.listItem}>
        <div className={styles.titleTime}>
          <div className={styles.authorTitle}>
            <h3 className={styles.blogTitle} onClick={handleBlogRoute}>{title}</h3>
            <p onClick={() => handleNavigation(author)} className={styles.author}>@{author}</p>
          </div>
          <p className={styles.cardTimestamp}>{formattedTimestamp}</p>
        </div>
        <p>{content.substr(0, 100)}...</p>
      </div>
    );
  };
  
  export default BlogItem;