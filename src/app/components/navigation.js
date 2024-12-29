'use client';
import { useRouter } from 'next/navigation';

import styles from '../page.module.css';
import Logout from '../logout/page';
import getUsername from '../helpers/getSessionUsername';
import Search from './search';


export default function Navigation() {
    const router = useRouter();
   
    const handleRouting = async (e) => {
        let page = e.target.innerText.toLowerCase();
        if (page === 'profile') {
            const slug = await getUsername();
            const user = localStorage.getItem('loggedInUser');
            router.push(`/${page}/${slug || user}`);
        }
        else {
            router.push(`/${page}`)
        }
    }
    
    return (
        <div className={styles.navContainer}>
            <div className={styles.navigation}>
                <p onClick={handleRouting} className={styles.navItem}>Explore</p>
                <Search />
                <p onClick={handleRouting} className={styles.navItem}>Profile</p>
                <Logout reroute={'/'}/>
            </div>
            <div className={styles.navigationLine}></div>
        </div>
    )
}