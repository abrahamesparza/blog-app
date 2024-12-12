'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function FriendRequests({ requests }) {
    console.log('friend requests', requests);
    return (
        <div>
            <p>Friend requests page</p>
        </div>
    )
};