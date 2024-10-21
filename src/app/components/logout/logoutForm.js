import React, { useState, useEffect } from "react";
import styles from '../../page.module.css';

export default function Logout() {
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
    };
    console.log(activeStatus)
    return (
        <div className={styles.logoutContainer}>
            { activeStatus ?
            <p 
            onClick={handleLogout}
            className={styles.logoutText}>Logout</p> :
            <p 
            onClick={handleLogout}
            className={styles.logoutText}></p>
            }
        </div>
    )
};