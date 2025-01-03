'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './write.module.css';
import Navigation from "../components/navigation";
import PrivacyOption from "../components/privacyOption";

export default function Write() {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [privacyOption, setPrivacyOption] = useState('public');
    const [submitting, setSubmitting] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        setAuthor(loggedInUser);
    }, []);

    const changeTitle = (e) => {
        setTitle(e.target.value);
    };

    const changeContent = (e) => {
        setContent(e.target.value);
    };

    const handleOption = (e) => {
        let option = e.target.value;
        setPrivacyOption(option);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const timestamp = new Date().toISOString();
            const formData = {
                author: author,
                content: content,
                title: title,
                timestamp: timestamp,
                privacy: privacyOption,
            };
            const response = await fetch('/api/write-blog-post', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.message === 'Success') {
                setUploadComplete(true);
                setSubmitting(false);
                if (origin === 'explore') {
                    setTimeout(() => router.push(`/explore`), 3000);
                } else {
                    setTimeout(() => router.push(`/profile/${author}`), 3000);
                }
            }
            else {
                console.error('Error posting blog.');
            }
        }
        catch (error) {
            console.error('Error posting blog data');
        }
    };

    return (
        <div>
            <Navigation />
            <div className={styles.blogContainer}>
                {!uploadComplete && (
                    <div>
                        <h3 className={styles.blogText}>Write a blog</h3>
                        <div className={styles.selectContainer}>
                            <p className={styles.blogTitle}>Title</p>
                            <PrivacyOption option={handleOption}/>
                        </div>
                        <div className={styles.centerContainer}>
                            <input className={styles.updateInput} onChange={changeTitle} type="text" disabled={submitting}/>
                            <p className={styles.blogContent}>Content</p>
                            <textarea className={styles.contentTextarea} onChange={changeContent} type="text" />
                            <div className={styles.contentButtonContainer}>
                                <button className={styles.submitBlogButton} onClick={handleSubmit}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
                {uploadComplete && (
                    <div className={styles.successMessage}>
                        <div className={styles.successAnimation}></div>
                        <p>Your blog has posted 🌀</p>
                        <p>Redirecting to your {origin === 'explore' ? 'feed' : 'profile'} ⏳</p>
                    </div>
                )}
        </div>
    )
}