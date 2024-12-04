import { useState, useEffect } from "react";

import styles from '../profile/profile.module.css';
import BackButton from "./backButton";

export default function UploadPhoto() {
    const [uploadStatus, setUploadStatus] = useState('');
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(null)

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
            setUploadStatus('Select a file first');
            return;
        }
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
                setUploadStatus('Upload failed');
                console.log('Upload failed');
            }
            else {
                setUploadStatus('File uploaded successfully');
            }
        }
        catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    return (
        <div className={styles.editContainer}>
            <BackButton />
            <h3>Upload Profile Picture</h3>
            <div className={styles.uploadContainer}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        </div>
    )
};