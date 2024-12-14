'use client';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { IoCheckmark, IoClose } from "react-icons/io5";
import Image from "next/image";

import styles from '../page.module.css';
import { generateProfileImageUrl } from "../helpers/sharedFunctions";

export default function FriendRequests() {
    const pathName = usePathname();
    const username = pathName.split('/')[2];
    
    const [friendRequests, setFriendRequests] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [profileImageUrls, setProfileImageUrls] = useState([]);

    useEffect(() => {
        getFriendRequests();
    }, []);

    const getFriendRequests = async () => {
        try {
            const response = await fetch(`/api/get-friend-requests?username=${username}`);
            const data = await response.json();

            if (data.error) {
                console.error('Error fetching friend requests');
            } else {               
                const usernames = data.friendRequests.map(request => request.username);
                const ids = data.friendRequests.map(request => request.id);

                setFriendRequests(usernames);
                setUserIds(ids);

                const urls = ids.map(id => generateProfileImageUrl(id));
                setProfileImageUrls(urls);
            }
        } catch (error) {
            console.error('Error fetching friend requests.');
        }
    };

    const handleApprove = async (e) => {
        //handle approve logic here
    };

    const handleDeny = async (e) => {
        //handle deny logic here
    };

    return (
        <div className={styles.friendRequestsContainer}>
            <p className={styles.frP}>Friend Requests</p>
            <div className={styles.frpLine}></div>

            {friendRequests.map((username, index) => (
                <div key={userIds[index]} className={styles.friendRequests}>
                    <Image
                        src={profileImageUrls[index]}
                        alt={`${username}'s profile`}
                        width={100}
                        height={100}
                        className={styles.profileImage}
                    />
                    <p className={styles.frP}>{username}</p>
                    <IoCheckmark size={22} color="green" onClick={handleApprove} className={styles.approve}/>
                    <IoClose size={22} color="red" onClick={handleDeny} className={styles.deny}/>
                </div>
            ))}
        </div>
    );
}
