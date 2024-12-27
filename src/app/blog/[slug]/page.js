'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

import styles from '../blog.module.css';
import Navigation from '../../components/navigation';
import BackButton from '@/app/components/backButton';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [deleteComplete, setDeleteComplete] = useState(false);
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const origin = searchParams.get('origin') || '';
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

    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current === true;

        getBlogData();

        const user = localStorage.getItem('loggedInUser' || '');
        const userId = localStorage.getItem('userId' || '');

        setLoggedInUser(user);
        setLoggedInUserId(userId);
    }, [username, slug]);

    const getBlogData = async () => {
        const response = await fetch(`/api/get-user-data?username=${username}`);
        const data = await response.json()
        if (data.error || data.message === 404) {
            console.error('Error fetching blog data');
            return;
        }
        setBlogs(data.blogs);
    };

    const updateBlog = async (blogId, updatedPrivacy) => {
        try {
            const formData = {
                updatedPrivacy,
                userId: loggedInUserId,
                blogId: blogId
            };
            const response = await fetch('/api/update-blog-privacy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            if (data.message === 'Success') {
                setBlogs(prevBlogs => 
                    prevBlogs.map(blog => 
                        blog.id === blogId ? data.updatedBlog : blog
                    )
                );
            } else {
                console.error('Failed to update blog privacy:', data.error);
            }
        } catch (error) {
            console.error('Error updating blog privacy:', error);
        }
    };
    

    const routeBack = () => {
        if (origin === 'explore') {
            router.push('/explore');
        } else {
            router.push(`/profile/${username}`);
        }
    };

    const handlePrivacyUpdate = (currentPrivacy, blogId) => {
        const newPrivacy = currentPrivacy === 'public' ? 'private' : 'public';
    
        setBlogs(prevBlogs => 
            prevBlogs.map(blog =>
                blog.id === blogId ? { ...blog, privacy: newPrivacy } : blog
            )
        );
        updateBlog(blogId, newPrivacy);
    };

    const handleDelete = async (blogId) => {
        const formData = {
            userId: loggedInUserId,
            blogId,
        };
        try {
            const response = await fetch('/api/delete-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.message === 'Success') {
                setDeleteComplete(true);
                if (origin === 'explore') {
                    setTimeout(() => router.push(`/explore`), 3000);
                } else {
                    setTimeout(() => router.push(`/profile/${username}`), 3000);
                }
            } else {
                console.log('Unable to route back to profile.');
            }
        } catch (error) {
            console.error('Error deleting blog', error);
        }
    };

    return (
        <div>
            <Navigation />
            <div  className={styles.blogLayout}>
                {deleteComplete && (
                    <div className={styles.successMessage}>
                        <div className={styles.successAnimation}></div>
                        <p>Your blog has been deleted 🗑️</p>
                        <p>Redirecting to your {origin === 'explore' ? 'feed' : 'profile'} ⏳</p>
                    </div>
                )}
                {!deleteComplete && (
                loggedInUser !== username ? ( 
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
                                                <MdOutlinePublic 
                                                    className={styles.publicIcon} 
                                                    onClick={() => handlePrivacyUpdate('public', blog.id)} 
                                                    size={24} 
                                                />
                                                <span className={styles.tooltip}>Public</span>
                                            </div>
                                            <div className={styles.iconWrapper}>
                                                <MdDeleteOutline 
                                                    onClick={() => handleDelete(blog.id)} 
                                                    className={styles.deleteIcon} 
                                                    size={28} 
                                                />
                                                <span className={styles.tooltip}>Delete</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.privacyContainer}>
                                            <div className={styles.iconWrapper}>
                                                <RiGitRepositoryPrivateFill 
                                                    className={styles.privateIcon} 
                                                    onClick={() => handlePrivacyUpdate('private', blog.id)} 
                                                    size={24} 
                                                />
                                                <span className={styles.tooltip}>Private</span>
                                            </div>
                                            <div className={styles.iconWrapper}>
                                                <MdDeleteOutline 
                                                    onClick={() => handleDelete(blog.id)} 
                                                    className={styles.deleteIcon} 
                                                    size={28} 
                                                />
                                                <span className={styles.tooltip}>Delete</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <h2 className={styles.blogTitle}>{blog.title}</h2>
                                <p>@{username}</p>
                                <p>{new Date(blog.timestamp).toLocaleString('en-US', dateOptions)}</p>
                                <p className={styles.blogContent}>{blog.content}</p>
                            </div>
                        ))}
                    </div>  
                ))}
            </div>
        </div>
    )
};

export default Blog;