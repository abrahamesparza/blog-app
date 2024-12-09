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
    const dateOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
    /*
    Todo: figure out how to call the api when the system detects
          an update since localStorage doesn't do that at the moment.
          OR simply call the api to get this data for each blog page
    */
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
                    <p>{new Date(blog.timestamp).toLocaleString('en-US', dateOptions)}</p>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
};

export default Blog;