import React from "react";
import styles from '../page.module.css';
import { useRouter } from "next/navigation";

export default function FormTypes() {
    const router = useRouter();
    
    function handleRouting(e) {
        let page = e.target.innerText;
        if (page === 'Sign Up') {
            page = 'signup'
        }
        else if (page === 'Log In') {
            page = 'login'
        }
        router.push(`/${page}`);
      };

    return (
        <div>
        <div className={styles.formOption}>
            <p className={styles.formTypeText}>Our Story</p>
            <p className={styles.formTypeText} onClick={handleRouting}>Sign Up</p>
            <p className={styles.formTypeText} onClick={handleRouting}>Log In</p>
        </div>
        <div className={styles.formOptionLine}></div>
        </div>
    )
}