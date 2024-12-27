import styles from '../profile/profile.module.css';
import { useRouter } from 'next/navigation';
import { SiNicehash } from "react-icons/si";

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

    const handleReaction = async (e) => {
      e.stopPropagation();
      //write api to store likes and retrieve
      alert('reaction alert');
    };

    const handleNavigation = (e, username) => {
      e.stopPropagation();
      router.push(`/profile/${username}`);
    };
  
    return (
      <div className={styles.listItem} onClick={() => handleBlogRoute(title)}>
        <div className={styles.titleTime}>
          <div className={styles.authorTitle}>
            <h3 className={styles.blogTitle}>{title}</h3>
            <p onClick={(e) => handleNavigation(e, author)} className={styles.author}>@{author}</p>
          </div>
          <p className={styles.cardTimestamp}>{formattedTimestamp}</p>
        </div>
        <p>{content.substr(0, 100)}...</p>
        <SiNicehash className={styles.reaction} size={12} onClick={handleReaction}/>
      </div>
    );
  };
  
  export default BlogItem;