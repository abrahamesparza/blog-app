'use client';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { CiSettings } from 'react-icons/ci';

import styles from '../blog.module.css';
import Navigation from '../../components/navigation';
import BackButton from '@/app/components/backButton';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
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
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user);
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

    const handleEditRoute = () => {
        router.push(`/blog/${slug}/edit`);
    };

    return (
        <div>
            <Navigation />
            <div  className={styles.blogLayout}>
                {loggedInUser !== username ? ( 
                    blogs
                    .filter(blog => blog.title === slug)
                    .map((blog, index) => (
                        <div className={styles.layoutOne}>
                            <div className={styles.blogContainer} key={index}>
                            <BackButton className={styles.backButton} routeBack={routeBack} />
                            <h2 className={styles.blogTitle}>{blog.title}</h2>
                            <p>@{username}</p>
                            <p>{new Date(blog.timestamp).toLocaleString('en-US', dateOptions)}</p>
                            <p className={styles.blogContent}>{blog.content}</p>
                            </div>
                        </div>
                    ))
                    ) : (
                    <div className={styles.layoutTwo}>
                        {blogs
                        .filter(blog => blog.title === slug)
                        .map((blog, index) => (
                                <div className={styles.blogContainer} key={index}>
                                    <BackButton className={styles.backButton} routeBack={routeBack} />
                                    <CiSettings className={styles.settingsPosition} onClick={handleEditRoute} size={25} /> 
                                    <h2 className={styles.blogTitle}>{blog.title}</h2>
                                    <p>@{username}</p>
                                    <p>{new Date(blog.timestamp).toLocaleString('en-US', dateOptions)}</p>
                                    <p className={styles.blogContent}>{blog.content}</p>
                                </div>
                            ))}
                    </div>  
                )}
            </div>
        </div>
    )
};

export default Blog;