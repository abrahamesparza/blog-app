import { useState, useEffect } from "react";

import styles from '../profile/profile.module.css';

const Bio = () => {
    const [bio, setBio] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        let bio = e.target.value;
        setBio(bio);
    }

    console.log('bio', bio);

    return (
        <div className={styles.editContainer}>
            <p className={styles.editPageText}>Add a bio about yourself.</p>
            <textarea className={styles.bioTextarea} onChange={handleChange} value={bio} />
            <div className={styles.bioButtonContainer}>
                <button className={styles.submitButton} onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}

export default Bio;