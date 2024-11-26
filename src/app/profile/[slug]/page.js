'use client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";

export default function Profile() {
  const pathName = usePathname();
  const username = pathName.split('/')[2];
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const response = await fetch(`/api/get-user-data?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setBlogs(data || []);
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
                {/* update so that each blog item is in a card */}
                <ul>
                  {blogs.map((item, index) => (
                    <li key={index}>{item.title}</li>
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