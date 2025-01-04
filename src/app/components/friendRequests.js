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
    const [loggedInUserId, setLoggedInUserId] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setLoggedInUserId(userId);

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

    const handleFriendRequest = async (friendRequest, friendRequestId, requestType) => {
        const formData = {
            loggedInUserId,
            friendRequest,
            friendRequestId,
            requestType,
        };
        try {
            const response = await fetch('/api/handle-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('DATA', data);
            if (data.message === 'Success') {
                setFriendRequests(prevRequest =>
                    prevRequest.filter(request => request !== friendRequest)
                );
            }
            else {
                console.log('Error handling friend request');
            }
        }
        catch (error) {
            console.error('Error handling friend request', error);
        }
    };

    return (
        <div className={styles.friendRequestsContainer}>
            <p className={styles.frP}>Friend Requests</p>
            <div className={styles.frpLine}></div>

            {/* //when there are no friend requests, show a 
                //message indicating so. */}
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
                    <IoCheckmark size={22} color="green" onClick={() => handleFriendRequest(friendRequests[index], userIds[index], 'approve')} className={styles.approve}/>
                    <IoClose size={22} color="red" onClick={() => handleFriendRequest(friendRequests[index], userIds[index], 'deny')} className={styles.deny}/>
                </div>
            ))}
        </div>
    );
}
