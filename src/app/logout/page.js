import React, { useState, useEffect } from "react";
import styles from '../page.module.css';
import { useRouter } from "next/navigation";

export default function Logout({ reroute }) {
    const router = useRouter();
    const [activeStatus, setStatus] = useState(true);

    async function handleLogout() {
        const response = await fetch('api/logout', {
            method: 'POST'
        });
        const message = await response.json();
        console.log(message);
        if (message.message === 'Success') {
            console.log('updating status to false')
            setStatus(false)
        }
        handleRouting();
    };

    function handleRouting() {
        router.push(reroute);
    };

    return (
        <div className={styles.logoutContainer}>
            { activeStatus ?
            <p 
            onClick={handleLogout}
            className={styles.logoutText}>Logout</p> :
            <p
            className={styles.logoutText}></p>
            }
        </div>
    )
};