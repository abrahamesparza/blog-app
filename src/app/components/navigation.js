import styles from '../landing/landingPage.module.css';
import Logout from '../logout/page';

export default function Navigation() {
    return (
        <div className={styles.navigation}>
            {/* improvement idea:
                create a modal to display below items
                stacked one above the other
            */}
            <p className={styles.navItem}>Write</p>
            <p className={styles.navItem}>Explore</p>
            <p className={styles.navItem}>Profile</p>
            <Logout reroute={'/'}/>
        </div>
    )
}