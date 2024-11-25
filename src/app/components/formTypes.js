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
        <div className={styles.formOption}>
            <h2 className={styles.formTypeText} onClick={handleRouting}>Sign Up</h2>
            <h2 className={styles.formTypeText} onClick={handleRouting}>Log In</h2>
        </div>
    )
}