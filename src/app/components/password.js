import { useState, useEffect } from "react";

import styles from '../profile/profile.module.css';

const Password = () => {
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log('hi from update password')
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        let password = e.target.value;
        setPassword(password);
    };

    return (
        <div className={styles.editContainer}>
            <p className={styles.editPageText}>Update password</p>
            <div className={styles.centerContainer}>
                <input className={styles.updateInput} onChange={handleChange} value={password} type="password"/>
                <button className={styles.submitButton} onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}

export default Password;