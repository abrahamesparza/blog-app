'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import styles from './explore.module.css';
import Navigation from '../components/navigation';
import Card from '../components/card';

export default function Explore() {
    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        getBlogData(userId);
    }, []);

    const getBlogData = async (userId) => {
        const url = `api/get-blog-data?userId=${userId}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setBlogData(data.items || []);
            localStorage.setItem('blogData', JSON.stringify(data.items) || []);
            setLoading(false);
        } catch (error) {
            console.error(`Error: ${error}`);
            setLoading(false);
        }
    };

    const handleProfileRoute = async (e) => {
        let slug = e.target.innerText.trim();
        router.push(`/profile/${slug}`)
    }

    const pageViewLimit = 10;
    const currentBlogs = blogData.length > 0
    ? blogData.slice(currentPage * pageViewLimit, (currentPage + 1) * pageViewLimit)
    : [];

    const handleNext = () => {
        if ((currentPage + 1) * pageViewLimit < blogData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.landingContainer}>
            <Navigation />
            <div className={styles.feedContainer}>
                <h1 className={styles.headingText}>Blogs</h1>
                <div className={styles.cardContainer}>
                {blogData.length === 0 ? (
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>No blogs available</p>
                    )
                ) : (
                    currentBlogs.map((blog, index) => (
                        <div key={index} className={styles.card}>
                            <Card
                                username={blog.username}
                                blogs={blog.blogs?.length}
                                handleProfileRoute={handleProfileRoute}
                            />
                        </div>
                    ))
                )}
                </div>
                <div className={styles.buttons}>
                    {currentPage > 0 && (
                            <button className={styles.buttonNp} onClick={handlePrev}>Previous</button>
                        )}
                    {currentBlogs.length > 0 && (currentPage + 1) * pageViewLimit < blogData.length && (
                        <button className={styles.buttonNp} onClick={handleNext}>Next</button>
                    )}
                </div>
            </div>
        </div>
    )
}
