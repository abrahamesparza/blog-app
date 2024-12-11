'use client'

import React, { useState, useEffect } from "react";

import styles from "./page.module.css";
import SignupForm from "./signup/page";
import LoginForm from "./login/page";
import FormTypes from "./components/formTypes";


export default function Home() {

  useEffect(() => {
    console.log('HI :D');
  }, [])

  const [form, setForm] = useState('');

  function handleForm(e) {
    let formType = e.target.innerText;
    setForm(formType)
  }

  return (
    <main>
      <div className={styles.homePage}>
        <div className={styles.formContainer}>
          {
            form === 'Sign Up' ? <SignupForm />
            : form === 'Log In' ? <LoginForm />
            : <FormTypes formType={handleForm}/>
          }
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>
            Every thought matters. <br/>Every experience shapes you. <br/>In this journal, your story is permanent — <br/>because growth isn’t about erasing <br/>the past, it’s about learning from it.
          </p>
        </div>
        <div className={styles.banner}>
        </div>
      </div>
    </main>
  );
}
