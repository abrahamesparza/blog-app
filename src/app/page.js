'use client'

import React, { useState, useEffect } from "react";

import styles from "./page.module.css";
import SignupForm from "./signup/page";
import LoginForm from "./login/page";
import FormTypes from "./components/formTypes";

import { generateBlogData } from './data/dataGeneration.js';


export default function Home() {

  // use to generate data in console for testing
  useEffect(() => {
    // generateBlogData();
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
