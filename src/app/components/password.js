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
            <p>Update password</p>
            <input className={styles.updateInput} onChange={handleChange} value={password} type="password"/>
            <button className={styles.submitButton} onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default Password;