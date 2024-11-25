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
            console.log('slug', slug);
            router.push(`${page}/${slug}`)
        }
        // else other path that doesn't have a slug
        router.push(`/${page}`);
    }
    
    return (
        <div className={styles.navigation}>
            {/* improvement idea:
                create a modal to display below items
                stacked one above the other
            */}
            <p onClick={handleRouting} className={styles.navItem}>Write</p>
            <p onClick={handleRouting} className={styles.navItem}>Explore</p>
            <p onClick={handleRouting} className={styles.navItem}>Profile</p>
            <Logout reroute={'/'}/>
        </div>
    )
}