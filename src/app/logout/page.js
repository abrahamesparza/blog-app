'use client';
import React, { useState, useEffect } from "react";
import styles from '../page.module.css';
import { useRouter } from "next/navigation";

export default function Logout({ reroute }) {
    const router = useRouter();

    async function handleLogout() {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        const data = await response.json();
        if (data.message === 'Success') {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userId');

            setTimeout(() => {
                handleRouting();
            }, 100);
        } else {
            console.error('Logout failed:', data.message);
        }
    };

    function handleRouting() {
        router.push(reroute);
    };

    return (
        <div className={styles.logoutContainer}>
            <p 
                onClick={handleLogout}
                className={styles.navItem}>
                Logout
            </p>
        </div>
    );
};
