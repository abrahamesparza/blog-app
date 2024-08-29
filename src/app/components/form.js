import React, { useState, useEffect } from "react";
import styles from '../page.module.css';

export default function Form() {    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    async function onChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function onSubmit(event) {
        event.preventDefault();

        let data = JSON.stringify(formData);
        const response = await fetch('/api/user', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log(`Result: ${result.message}`);
    }

    return (
        <div className={styles.formBody}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>Name</label>
                <input
                onChange={onChange}
                type="text"
                className={styles.input}
                name="name"
                value={formData.name}
                />
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
            </form>
        </div>
    )
}