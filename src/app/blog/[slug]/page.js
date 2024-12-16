'use client';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
//use the two icons above to display whether a blog is public or private

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

    const handleOption = (e) => {
        let option = e.target.value;
        setPrivacyOption(option);
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
                            <p className='3'>@{username}</p>
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
                                    <div className={styles.editIcons}>
                                        {blog.privacy === 'public' ? (
                                            <div className={styles.privacyContainer}>
                                                <div className={styles.iconWrapper}>
                                                    <MdOutlinePublic size={24} />
                                                    <span className={styles.tooltip}>Public</span>
                                                </div>
                                            
                                                <div className={styles.iconWrapper}>
                                                    <MdDeleteOutline className={styles.deleteIcon} size={28} />
                                                    <span className={styles.tooltip}>Delete</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.privacyContainer}>
                                                <div className={styles.iconWrapper}>
                                                    <RiGitRepositoryPrivateFill size={24} />
                                                    <span className={styles.tooltip}>Private</span>
                                                </div>
                                            
                                                <div className={styles.iconWrapper}>
                                                    <MdDeleteOutline className={styles.deleteIcon} size={28} />
                                                    <span className={styles.tooltip}>Delete</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className={styles.blogTitle}>{blog.title}</h2>
                                    <p className='3'>@{username}</p>
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