'use client'

import React, { useState } from "react";

import styles from "./page.module.css";
import SignupForm from "./signup/page";
import LoginForm from "./login/page";
import FormTypes from "./components/formTypes";


export default function Home() {
  const [form, setForm] = useState('');

  function handleForm(e) {
    let formType = e.target.innerText;
    setForm(formType)
  }

  return (
    <main>
      <div className={styles.homePage}>
        <div className={styles.banner}>
        </div>
        <div>
          {
            form === 'Sign Up' ? <SignupForm />
            : form === 'Log In' ? <LoginForm />
            : <FormTypes formType={handleForm}/>
          }
        </div>
      </div>
    </main>
  );
}
