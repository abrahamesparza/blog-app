'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { HiPencilSquare } from "react-icons/hi2";

import styles from './explore.module.css';
import Navigation from '../components/navigation';
import BlogItem from "../components/blogItem";
import { generateProfileImageUrl } from "../helpers/sharedFunctions";

export default function Explore() {
    const [blogData, setBlogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [profileUrls, setProfileUrls] = useState([]);
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
            const urls = data.items.map(user => { 
                let imageData = { 
                    author: user.username,
                    profileImage: generateProfileImageUrl(user.id)
                } 
                return imageData
            });

            setProfileUrls(urls);
            console.log('urls', urls);
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

    const handleBlogRoute = async (blogTitle, username) => {
      router.push(`/blog/${blogTitle}?username=${username}&origin=explore`);
    };

    const handleWrite = () => {
        router.push('/write?origin=explore');
    }

    return (
        <div className={styles.landingContainer}>
            <Navigation />
            <h1 className={styles.feedText}>Timeline</h1>
            <div className={styles.pencilContainer}>
                <div className={styles.iconWrapper}>
                    <HiPencilSquare className={styles.pencil} size={28} onClick={handleWrite}/>
                    <span className={styles.tooltip}>Write</span>
                </div>
            </div>
            <div className={styles.feedContainer}>
                <div className={styles.cardContainer}>
                {blogData.length === 0 ? (
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>No journals written</p>
                    )
                ) : (
                    currentBlogs
                        .flatMap((user) => 
                            user.blogs.map((blog) => ({
                                ...blog,
                                authorImage: profileUrls.find(profile => profile.author === blog.author)?.profileImage
                            }))
                        )
                        .filter(blog => blog.privacy === 'public' && blog.privacy !== undefined)
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((blog, index) => (
                            <div key={index} className={styles.card}>
                                <BlogItem
                                    image={blog.authorImage}
                                    author={blog.author}
                                    title={blog.title}
                                    content={blog.content.slice(0, 100)}
                                    timestamp={blog.timestamp}
                                    handleBlogRoute={() => handleBlogRoute(blog.title, blog.author)}
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
