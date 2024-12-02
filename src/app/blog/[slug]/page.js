'use client';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import styles from '../blog.module.css';
import Navigation from '../../components/navigation';
import BackButton from '@/app/components/backButton';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const pathname = usePathname();
    const slug = decodeURIComponent(pathname.split('/').pop());
    const router = useRouter();

    useEffect(() => {
        let storedBlogs = localStorage.getItem('blogs')
        storedBlogs = JSON.parse(storedBlogs);
        const filteredBlogs = storedBlogs[username].find(blog => blog.title === slug);
        setBlogs([filteredBlogs]);
    }, [username, slug]);

    const routeBack = () => {
      router.push(`/profile/${username}`);
    }

    return (
        <div>
            <Navigation />
            {blogs.map((blog, index) => (
                <div className={styles.blogContainer} key={index}>
                    <BackButton routeBack={routeBack}/>
                    <h2>{blog.title}</h2>
                    <p>@{username}</p>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
};

export default Blog;