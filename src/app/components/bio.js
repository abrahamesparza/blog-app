import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import styles from '../profile/profile.module.css';

const Bio = () => {
    const [bio, setBio] = useState('');
    const [page, setPage] = useState(null);
    const [username, setUsername] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setPage('bio');
        setUsername(user)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = '/api/edit-profile';
            const data = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: bio, page: page, username: username })
            });
    
            const response = await data.json();
            if (response.error) {
                console.error('Error updating bio.');
            }
            else {
                localStorage.setItem('bio', response.updatedField);
                setUploadComplete(true);
                setTimeout(() => router.push(`/profile/${username}`), 3000);
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
        let bio = e.target.value;
        setBio(bio);
    }

    return (
        <div className={styles.editContainer}>
            {!uploadComplete && (
                <div>
                    <p className={styles.editPageText}>Add a bio about yourself.</p>
                    <textarea className={styles.bioTextarea} onChange={handleChange} value={bio} disabled={submitting} />
                    <div className={styles.bioButtonContainer}>
                        <button
                        className={styles.submitButton}
                        onClick={handleSubmit} >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            )}
            {uploadComplete && (
                <div className={styles.successMessage}>
                    <div className={styles.successAnimation}></div>
                    <p>Your bio is updated ✨</p>
                    <p>Redirecting to your profile ⏳</p>
                </div>
            )}
        </div>
    )
}

export default Bio;