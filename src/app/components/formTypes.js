import React from "react";
import styles from '../page.module.css';

export default function FormTypes({ formType }) {

    return (
        <div className={styles.formOption}>
            <h2 onClick={formType}>Sign Up</h2>
            <h2 onClick={formType}>Log In</h2>
        </div>
    )
}