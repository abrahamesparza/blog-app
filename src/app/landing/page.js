'use client'
import React, {useState, useEffect } from 'react';
import styles from './landingPage.module.css';

import Logout from '../logout/page';

export default function HomePage() {

    useEffect(() => {
        console.log('temporary placeholder')
    }, []);


    /*
    - Rewrite landing page to show generated blog data
    - Move the below code to a writeBlog component
    */
    return (
        <div className={styles.landingContainer}>
            <h1>Blog content goes here</h1>
            <h2>Write a blog</h2>
            <Logout reroute={'/'}/>
        </div>
    )
}