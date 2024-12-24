'use client';
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from 'react-icons/io';

import { useRouter } from "next/navigation";
import styles from '../page.module.css';
import BackButton from "../components/backButton";

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
    const [username, setUsername] = useState('');
    const [forgotPasword, setForgotPassword] = useState(false);

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
        setLoginResult(result.message);
        localStorage.setItem('loggedInUser', result.username);
        localStorage.setItem('userId', result.userId);
        setUsername(result.username);
        setFormData(initialFormData);
        setCheckLogin(true)
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

    function handlePassword() {
        setForgotPassword(true);

        if (forgotPasword) {
            router.push('/forgot-password');
        }
        return;

    }

    if (nextPage) {
        router.push(`/profile/${username}`);
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
                <div className={styles.linksContainer}>
                    {/* <p className={styles.forgotPassword} onClick={handlePassword}>Forgot password?</p> */}

                    <p
                    onClick={handleRouting}
                    className={styles.signUpText}
                    value='Sign Up'
                    >New User? Sign Up</p>
                </div>
                <IoIosArrowRoundBack className={styles.backButton} onClick={handleRouting} size={28}/>
            </form>
        </div>
    )
}