'use client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CiSettings } from 'react-icons/ci';
import { useRouter } from 'next/navigation';


import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";
import BlogItem from "@/app/components/blogItem";
import BackButton from "@/app/components/backButton";

export default function Profile() {
  const pathName = usePathname();
  const username = pathName.split('/')[2];
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profileExists, setProfileExists] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(storedUser);
    }
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || {};

    if (storedBlogs[username]) {
      setBlogs(storedBlogs[username]);
      setProfileExists(true);
      setLoading(false);
    } else {
      try {
        const response = await fetch(`/api/get-user-data?username=${username}`);
        const data = await response.json();
        if (data.message === 404) {
          setProfileExists(false);
        } else {
          setBlogs(data.blogs || []);
          const updatedBlogs = { ...storedBlogs, [username]: data.blogs || [] };
          localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
          setProfileExists(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleBlogRoute = async (e) => {
    let blogTitle = e.target.innerText;
    router.push(`/blog/${blogTitle}?username=${username}`);
  };

  const routeBack = () => {
    router.push('/landing');
  }

  return (
    <div className={styles.profile}>
      <Navigation />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.profileChildOne}>
            <p>Loading...</p>
          </div>
        ) : profileExists === false ? (
          <div className={styles.profileChildOne}>
            <BackButton routeBack={routeBack}/>
            <h3 className={styles.username}>@{username}</h3>
            <div className={styles.blogList}>
                <h1 className={styles.doesNotExist}>User does not exist.</h1>
            </div>
          </div>
        ) : (
          <div className={styles.profileChildOne}>
            <BackButton routeBack={routeBack}/>
            <h3 className={styles.username}>@{username}</h3>
            <div className={styles.follows}>
              <p>700 Followers</p>
              <p>300 Following</p>
            </div>
            <div className={styles.aboutContainer}>
              <p className={styles.aboutText}>About section for user.</p>
            </div>
            <div className={styles.blogList}>
              <h3 className={styles.blogHeader}>Blogs</h3>
              {blogs.length > 0 ? (
                <ul className={styles.blogUl}>
                  {blogs.map((item, index) => (
                    <BlogItem
                      key={index}
                      title={item.title}
                      content={item.content}
                      handleBlogRoute={handleBlogRoute}
                      username={username}
                    />
                  ))}
                </ul>
              ) : (
                <p>No blogs available</p>
              )}
            </div>
          </div>
        )}

        <div className={styles.profileChildTwo}>
          {loggedInUser === username ? <CiSettings size={25} /> : null}
        </div>

      </div>
    </div>
  );
}
