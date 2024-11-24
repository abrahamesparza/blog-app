'use client';
import React, { useState, useEffect } from "react";
import styles from '../page.module.css';

import { useRouter } from "next/navigation";

import HomePage from "../landing/page";

export default function LoginForm() {  
    const router = useRouter();
    const initialFormData = {
        email: '',
        password: '',
    }  
    const [formData, setFormData] = useState(initialFormData);
    const [loginResult, setLoginResult] = useState('');
    const [nextPage, setNextPage] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);

    useEffect(() => {
        if (loginResult) {
            validateLoginResult()
        }
    }, [checkLogin]);

    const validateLoginResult = () => {
        if (loginResult === 'Success') {
            router.push('/landing');
            setNextPage(true);
        }
        else {
            alert('We couldn\'t find an account with those details. Please recheck and try again!');
            setNextPage(false);
            return; // some sort of try again modal or
                    // refresh the page with all the
                    // fields filled besides the password
        }
    }

    async function onChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    };

    async function onSubmit(event) {
        event.preventDefault();

        let data = JSON.stringify(formData);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log('setting loginResult', result.message)
        setLoginResult(result.message);
        setFormData(initialFormData);
        setCheckLogin(true)
    }

    function handleRouting(e) {
        let page = e.target.innerText;

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
      };

    if (nextPage) {
        return <HomePage />
    }

    return (
        <div className={styles.formBody}>
            <form onSubmit={onSubmit} className={styles.form}>

                <label>Email</label>
                <input
                onChange={onChange}
                type="email"
                className={styles.input}
                name="email"
                value={formData.email}
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
                value='Sign Up'
                >New User? Sign Up</p>
                <p onClick={handleRouting}
                className={styles.pText}>Home</p>
            </form>
        </div>
    )
}