import { useState, useEffect } from "react";

import styles from '../profile/profile.module.css';

const Bio = () => {
    const [bio, setBio] = useState('');
    const [page, setPage] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setPage('bio');
        setUsername(user)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/edit-profile';
        const data = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: bio, page: page, username: username })
        });
        const response = await data.json();
        localStorage.setItem('bio', response.updatedField);
        console.log('response:', response)
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