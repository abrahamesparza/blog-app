import React, { useState } from "react";
import styles from '../page.module.css';

export default function SignupForm({ formType }) {  
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        role: 'Seller',
        password: '',
    }  
    const [formData, setFormData] = useState(initialFormData);

    async function onChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
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
        console.log(`Result: ${result.message}`); // logs result

        setFormData(initialFormData) // clears form data after submission
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

                <label>Select a role</label>
                <select
                onChange={onChange}
                className={styles.input}
                name="role"
                value={formData.role}>
                    <option>Seller</option>
                    <option>Buyer</option>
                </select>

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
                onClick={() => formType('Log In')}
                className={styles.pText}
                >Existing User? Log In</p>
            </form>
        </div>
    )
}