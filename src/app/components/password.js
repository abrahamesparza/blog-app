import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from '../profile/profile.module.css';

const Password = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [page, setPage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setPage('password');
        setUsername(user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = '/api/edit-profile';
            const data = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: password, page: page, username: username })
            });
    
            const response = await data.json();
            if (response.error) {
                console.error('Error updating password.');
            }
            else {
                setUploadComplete(true);
                setTimeout(() => router.push(`/profile/${username}`), 3000);
                console.log('response:', response)
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
        let password = e.target.value;
        setPassword(password);
    };

    return (
        <div className={styles.editContainer}>
            {!uploadComplete && (
            <div>
                <p className={styles.editPageText}>Update password</p>
                <div className={styles.centerContainer}>
                    <input className={styles.updateInput} onChange={handleChange} value={password} type="password" disabled={submitting}/>
                    <button className={styles.submitButton} onClick={handleSubmit} >
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
            )}
            {uploadComplete && (
                <div className={styles.successMessage}>
                    <div className={styles.successAnimation}></div>
                    <p>Your password is updated 🔒</p>
                    <p>Redirecting to your profile ⏳</p>
                </div>
            )}
        </div>
    )
}

export default Password;