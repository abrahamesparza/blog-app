'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Image from 'next/image';

import { generateProfileImageUrl } from '@/app/helpers/sharedFunctions';
import Navigation from '../../../components/navigation';
import styles from '../../profile.module.css';

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const pathName = usePathname();
    const username = pathName.split('/')[2];
    const [profileImageUrls, setProfileImageUrls] = useState([]);
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
                const ids = data.friends.map(friend => friend.id);
                const urls = ids.map(id => generateProfileImageUrl(id));

                setProfileImageUrls(urls);
                setFriends(data.friends);
            }
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const handleProfileRoute = (username) => {
        router.push(`/profile/${username}`);
    }

    const routeBack = () => {
        router.push(`/profile/${username}`);
    };

    return (
        <div className={styles.profile}>
            <Navigation />
            <div className={styles.editContainer}>
                <IoIosArrowRoundBack className={styles.backButton} onClick={routeBack} size={28} />
            </div>
            <ul className={styles.friendsList}>
                {friends.map((item, index) => (
                    <li key={index} className={styles.friendItem} onClick={() => handleProfileRoute(item.username)}>
                        <Image
                        src={profileImageUrls[index]}
                        alt={`${username}'s profile`}
                        width={100}
                        height={100}
                        className={styles.profileImage}
                        />
                        <span className={styles.friendName}>{item.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
