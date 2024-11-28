'use client'
import React, {useState, useEffect } from 'react';

import styles from './landingPage.module.css';
import Navigation from '../components/navigation';
import Card from '../components/card';

export default function HomePage() {
    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogData();
    }, []);

    const getBlogData = async () => {
        const storedBlogs = localStorage.getItem('blogData');
        if (storedBlogs) {
            const parsedBlogs = JSON.parse(storedBlogs);
            setBlogData(parsedBlogs);
            setLoading(false);
            return;
        }

        const url = 'api/get-blog-data';
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
