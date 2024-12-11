'use client'
import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './landingPage.module.css';
import Navigation from '../components/navigation';
import Card from '../components/card';

export default function HomePage() {

    useEffect(() => {
        console.log('new landing');
    }, []);

    return (
        <div className={styles.landingContainer}>
            <Navigation />
            <div className={styles.feedContainer}>
                <p>New landing page</p>
            </div>
        </div>
    )
}
