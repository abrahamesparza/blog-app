'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from '../profile/profile.module.css';

export default function UploadPhoto() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setUsername(user);
    }, [])

    const handleFileChange = (e) => {
        let targetFile = e.target.files[0];
        setFile(targetFile);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('File required to upload!');
            return;
        }
        setUploading(true);
        try {
            const response = await fetch('/api/upload-pfp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    fileName: file.name
                }),
            });

            const { uploadUrl } = await response.json();
            await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });

            if (response.error) {
                console.error('Upload failed');
            }
            else {
                setUploadComplete(true);
                setTimeout(() => router.push(`/profile/${username}`), 3000);
            }
        }
        catch (error) {
            console.error('Error uploading file:', error)
        }
        finally {
            setUploading(false);
        }
    }

    return (
        <div className={styles.editContainer}>
            {!uploadComplete && (
                <div>
                    <p className={styles.editPageText}>Upload Profile Picture</p>
                    <div className={styles.uploadContainer}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        <button onClick={handleUpload}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>
            )}
            {uploadComplete && (
                <div className={styles.successMessage}>
                    <div className={styles.successAnimation}></div>
                    <p>Your profile picture was uploaded successfully 😎✨</p>
                    <p>Redirecting to your profile ⏳</p>
                </div>
            )}
        </div>
    )
};