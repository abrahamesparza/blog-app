'use client'
import React, { useState } from "react";
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from 'react-icons/io';

import HomePage from '../landing/page';

export default function SignupForm() {  
    const router = useRouter();
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    }  
    const [formData, setFormData] = useState(initialFormData);
    const [nextPage, setNextPage] = useState(false);
    const [username, setUsername] = useState('');

    async function onChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function checkNextStep(message) {
        if (message === 'Success') {
            setNextPage(true);
        }
        else {
            setNextPage(false);
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        let data = JSON.stringify(formData);
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        localStorage.setItem('loggedInUser', result.username);
        setUsername(result.username);
        checkNextStep(result.message)
        setFormData(initialFormData)
    }

    function handleRouting(e) {
        let target = e.currentTarget;
        let page = target.innerText || '/';

        if (page.includes('Sign Up')) {
            page = 'signup';
        }
        else if (page.includes('Log In')) {
            page = 'login';
        }
        else if (page.includes('Home')) {
            page = '/';
        }
        router.push(`/${page}`);
    }

    if (nextPage) {
        router.push(`/profile/${username}`);
    }

    return (
        <div className={styles.formBody}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>First Name</label>
                <input
                onChange={onChange}
                type="text"
                className={styles.input}
                name="firstName"
                value={formData.firstName}
                />

                <label>Last Name</label>
                <input
                onChange={onChange}
                type="text"
                className={styles.input}
                name="lastName"
                value={formData.lastName}
                />

                <label>Email</label>
                <input
                onChange={onChange}
                type="email"
                className={styles.input}
                name="email"
                value={formData.email}
                />

                <label>Username</label>
                <input
                onChange={onChange}
                type="text"
                className={styles.input}
                name="username"
                value={formData.username}
                />

                <label>Password</label>
                <input
                onChange={onChange}
                type="password"
                className={styles.input}
                name="password"
                value={formData.password}
                />

                <button
                type="submit"
                className={styles.formButton}>Submit</button>

                <p
                onClick={handleRouting}
                className={styles.pText}
                >Existing User? Log In</p>
                <IoIosArrowRoundBack className={styles.backButton} onClick={handleRouting} size={28}/>
            </form>
        </div>
    )
}