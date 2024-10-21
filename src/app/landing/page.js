'use client'
import React, {useState, useEffect } from 'react';
import styles from './homePage.module.css';

import Logout from '../logout/page';

export default function HomePage() {

    useEffect(() => {
        console.log('temporary placeholder')
    }, []);


    // find an api to populate with data
    return (
        <div className={styles.container}>
            <Logout reroute={'/'}/>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <h1 className={styles.blogTitle}>Write a blog post</h1>
                    <div className={styles.blogContainer}>
                        <label>Title</label>
                        <input
                        type='text'
                        name='blogName'
                        className={styles.generalInput}
                        />
                        <label>Story</label>
                        <textarea
                        type='text'
                        name='blogContent'
                        className={styles.contentInput}
                        />
                        <button
                        type='button'
                        name='button'
                        className={styles.button}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}