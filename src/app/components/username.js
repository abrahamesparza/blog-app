import { useState, useEffect } from "react";

import styles from '../profile/profile.module.css';

const Username = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log('hi from update username')
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        let username = e.target.innerText;
        setUsername(username);
    };

    console.log('username', username);

    return (
        <div className={styles.editContainer}>
            <p className={styles.editPageText}>Update username</p>
            <div className={styles.centerContainer}>
                <input className={styles.updateInput} onChange={handleChange} type="text"/>
                <button className={styles.submitButton} onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}

export default Username;