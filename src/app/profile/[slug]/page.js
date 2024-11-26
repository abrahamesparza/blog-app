'use client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";
import BlogItem from "@/app/components/blogItem";

export default function Profile() {
  const pathName = usePathname();
  const username = pathName.split('/')[2];
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
      return;
    }

    const response = await fetch(`/api/get-user-data?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setBlogs(data || []);
    localStorage.setItem('blogs', JSON.stringify(data));
  };

    return (
      <div className={styles.profile}>
          <Navigation />
          <div className={styles.container}>

            <div className={styles.profileChildOne}>
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
                <ul className={styles.blogUl}>
                  {blogs.map((item, index) => (
                    <BlogItem key={index} title={item.title} content={item.content} />
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.profileChildTwo}>
              {/* replace with settings icon */}
              <p>Edit</p> 
            </div>

          </div>
      </div>
    );
  }