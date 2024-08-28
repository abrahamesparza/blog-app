import React from "react";
import styles from '../page.module.css';

export default function Form() {    
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        console.log('form data: ', formData);
    }

    return (
        <div className={styles.formBody}>
            <form onSubmit={onSubmit} className={styles.form}>
                <input type="text" className={styles.input} name="mame"/>
                <input type="text" className={styles.input} name="email"/>
                <input type="password" className={styles.input} name="password"/>
                <button type="submit" className={styles.formButton}>Submit</button>
            </form>
        </div>
    )
}