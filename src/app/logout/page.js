import React, { useState, useEffect } from "react";
import styles from '../page.module.css';
import { useRouter } from "next/navigation";

export default function Logout({ reroute }) {
    const router = useRouter();

    async function handleLogout() {
        await fetch('api/logout', {
            method: 'POST'
        });
        localStorage.removeItem('blogData');
        localStorage.removeItem('blogs');
        localStorage.removeItem('loggedInUser');
        handleRouting();
    };

    function handleRouting() {
        router.push(reroute);
    };

    return (
        <div className={styles.logoutContainer}>
            <p 
            onClick={handleLogout}
            className={styles.navItem}>Logout</p>
        </div>
    )
};