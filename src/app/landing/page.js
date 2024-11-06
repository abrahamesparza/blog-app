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
   let fakeBlogs = [
        {
        'name': 'bob',
        'title': 'the builder'
        },
        {
        'name': 'cookie',
        'title': 'the monster'
        },
        {
        'name': 'oscar',
        'title': 'the grouch'
        },
        {
        'name': 'meowdas',
        'title': 'the meowdiest'
        },
        {
        'name': 'snoop',
        'title': 'the d o double g'
        },
        {
        'name': 'juice',
        'title': 'the world'
        },
        {
        'name': 'buzz',
        'title': 'the lightyear'
        },
        {
        'name': 'midas',
        'title': 'the rex'
        },
        {
        'name': 'rick',
        'title': 'the morty'
        },
        {
        'name': 'woody',
        'title': 'the cowboy'
        },
];
    return (
        <div className={styles.landingContainer}>
            <div className={styles.navigation}>
                {/* improvement idea:
                    create a modal to display below items
                    stacked one above the other
                */}
                <p>Write</p>
                <p>Explore</p>
                <p>Profile</p>
                <Logout reroute={'/'}/>
            </div>
            <div className={styles.feedContainer}>
                {fakeBlogs.map((item, index) => (
                    <div>
                        <p
                        className={styles.blogItem}
                        key={index}>
                            {item.name}<br/>
                            {item.title}
                        </p>
                    </div>
                ))} 
            </div>
        </div>
    )
}