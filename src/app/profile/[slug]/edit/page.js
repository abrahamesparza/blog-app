'use client';
import { useState, useEffect } from 'react';

import Navigation from '@/app/components/navigation';

export default function Edit() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
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
        <div>
            <Navigation />
            <div>
                <h2>Upload Profile Picture</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        </div>
    )
}