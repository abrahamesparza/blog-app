'use client'
import React, {useState, useEffect } from 'react';

import styles from './landingPage.module.css';
import Logout from '../logout/page';
import Card from '../components/card';
import { hasAccess } from '../helpers/authHelper';

export default function HomePage() {
    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getBlogData();
    }, []);

    const getBlogData = async () => {
        const url = 'api/get-blog-data';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setBlogData(data.items);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const pageViewLimit = 10;
    const currentBlogs = blogData.slice(currentPage * pageViewLimit, (currentPage + 1) * pageViewLimit);

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
            <div className={styles.navigation}>
                {/* improvement idea:
                    create a modal to display below items
                    stacked one above the other
                */}
                <p className={styles.navItem}>Write</p>
                <p className={styles.navItem}>Explore</p>
                <p className={styles.navItem}>Profile</p>
                <Logout reroute={'/'}/>
            </div>
            <div className={styles.feedContainer}>
                <h1 className={styles.headingText}>Blogs</h1>
                <div className={styles.cardContainer}>
                    {currentBlogs.map((blog, index) => (
                        <div key={index} className={styles.card}>
                            <Card
                            key={index}
                            username={blog.username}
                            blogs={blog.blogs?.length}
                            />
                        </div>
                    ))}
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
