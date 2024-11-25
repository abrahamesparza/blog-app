'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";

export default function Profile() {
  const pathName = usePathname();
  const username = pathName.split('/')[2];

  // write logic to get blog data for username
  // displays in blogList container
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
                <p>display a list of blogs here</p>
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