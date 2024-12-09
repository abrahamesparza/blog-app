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
    
    useEffect(() => {
        getBlogData();

    }, [username, slug]);

    const getBlogData = async () => {
        const response = await fetch(`/api/get-user-data?username=${username}`);
        const data = await response.json()
        if (data.error || data.message === 404) {
            console.error('Error fetching blog data');
        }
        console.log(data);
        setBlogs(data.blogs);
    }

    const routeBack = () => {
      router.push(`/profile/${username}`);
    }

    return (
        <div>
            <Navigation />
            {blogs.map((blog, index) => 
                blog.title === slug ? ( 
                    <div className={styles.blogContainer} key={index}>
                    <BackButton routeBack={routeBack} />
                    <h2>{blog.title}</h2>
                    <p>@{username}</p>
                    <p>{new Date(blog.timestamp).toLocaleString('en-US', dateOptions)}</p>
                    <p>{blog.content}</p>
                    </div>
                ) : (
                    ''
                )
                )}
        </div>
    )
};

export default Blog;