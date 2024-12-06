import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from '../profile/profile.module.css';

const Username = () => {
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [username, setUsername] = useState('');
    const [page, setPage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setPage('username');
        setUsername(user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            console.log(username)
            console.log(page)
            const url = '/api/edit-profile';
            const data = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: updatedUsername, page: page, username: username })
            });
    
            const response = await data.json();
            if (response.error) {
                console.error('Error updating username.');
            }
            else {
                setUploadComplete(true);
                localStorage.setItem('loggedInUser', response.updatedField)
                setTimeout(() => router.push(`/profile/${updatedUsername}`), 3000);
            }
        }
        catch(error) {
            console.error('Error:', error);
        }
        finally {
            setSubmitting(false);
        }
    }

    const handleChange = (e) => {
        let username = e.target.value;
        setUpdatedUsername(username);
    };
    console.log('updated username:', updatedUsername);
    console.log('username', username);

    return (
        <div className={styles.editContainer}>
        {!uploadComplete && (
            <div>
                <p className={styles.editPageText}>Update username</p>
                <div className={styles.centerContainer}>
                    <input className={styles.updateInput} onChange={handleChange} type="text" disabled={submitting}/>
                    <button className={styles.submitButton} onClick={handleSubmit} >
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        )}
        {uploadComplete && (
                <div className={styles.successMessage}>
                    <div className={styles.successAnimation}></div>
                    <p>Your username is updated 👤</p>
                    <p>Redirecting to your profile ⏳</p>
                </div>
            )}
        </div>
    )
}

export default Username;