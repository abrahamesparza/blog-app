'use client';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from '../blog.module.css';
import Navigation from '../../components/navigation';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const pathname = usePathname();
    const slug = decodeURIComponent(pathname.split('/').pop());

    useEffect(() => {
        let storedBlogs = localStorage.getItem('blogs')
        storedBlogs = JSON.parse(storedBlogs);
        const filteredBlogs = storedBlogs[username].find(blog => blog.title === slug);
        setBlogs([filteredBlogs]);
    }, [username, slug]);

    return (
        <div>
            <Navigation />
            {blogs.map((blog, index) => (
                <div
                className={styles.blogContainer}
                key={index}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
};

export default Blog;