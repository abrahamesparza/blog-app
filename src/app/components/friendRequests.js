'use client';
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

export default function FriendRequests() {
    const pathName = usePathname();
    const username = pathName.split('/')[2];
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        getFriendRequests();
    }, [])

    const getFriendRequests = async () => {
        try {
            const response = await fetch(`/api/get-friend-requests?username=${username}`);
            const data = await response.json();
            if (data.error) {
                console.error('Error fetching friend requets');
            }
            else {
                setFriendRequests(data.friendRequests);
            }
        }
        catch (error) {
            console.error('Error fetching friend requests.');
        }
    };

    return (
        <div>
            <p>Friend Requests</p>
            {friendRequests.map((item, index) => (
                <p>{item}</p>
            ))}
        </div>
    )
};