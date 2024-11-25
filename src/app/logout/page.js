import React, { useState, useEffect } from "react";
import styles from '../page.module.css';
import { useRouter } from "next/navigation";

export default function Logout({ reroute }) {
    const router = useRouter();

    async function handleLogout() {
        await fetch('api/logout', {
            method: 'POST'
        });
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