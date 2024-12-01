'use client';
import { useRouter } from 'next/navigation';

import styles from '../landing/landingPage.module.css';
import Logout from '../logout/page';
import getUsername from '../helpers/getSessionUsername';


export default function Navigation() {
    const router = useRouter();
   
    const handleRouting = async (e) => {
        let page = e.target.innerText.toLowerCase();
        if (page === 'profile') {
            const slug = await getUsername();
            const user = localStorage.getItem('loggedInUser');
            router.push(`/${page}/${slug || user}`);
        }
        else if (page === 'home') {
            router.push('/landing');
        }
        else {
            router.push(`/${page}`)
        }
    }
    
    return (
        <div className={styles.navigation}>
            {/* improvement idea:
                create a modal to display below items
                stacked one above the other
            */}
            <p onClick={handleRouting} className={styles.navItem}>Home</p>
            <p onClick={handleRouting} className={styles.navItem}>Write</p>
            <p onClick={handleRouting} className={styles.navItem}>Explore</p>
            <p onClick={handleRouting} className={styles.navItem}>Profile</p>
            <Logout reroute={'/'}/>
        </div>
    )
}