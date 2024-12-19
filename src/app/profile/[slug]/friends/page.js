'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Navigation from '../../../components/navigation';
import styles from '../../profile.module.css';

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const pathName = usePathname();
    const username = pathName.split('/')[2];
    const router = useRouter();

    useEffect(() => {
        fetchFriends();
    }, []);


    const fetchFriends = async () => {
        try {
            const response = await fetch(`/api/get-friend-requests?username=${username}`);
            const data = await response.json();

            if (data.error) {
                console.error('Error fetching friend requests');
            } else {
                setFriends(data.friends);
            }
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const routeBack = () => {
        router.push(`/profile/${username}`);
    };

    return (
        <div className={styles.profile}>
            <Navigation />
            <div className={styles.editContainer}>
                <IoIosArrowRoundBack className={styles.backButton} onClick={routeBack} size={28} />
            </div>
            <ul>
                {friends.map((item, index) => (
                    <li key={index}>{item.username}</li>
                ))}
            </ul>
        </div>
    );
}
