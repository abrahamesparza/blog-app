'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import SignupForm from "./signup/page";
import LoginForm from "./login/page";
import FormTypes from "./components/formTypes";
import OurStory from "./our-story/page";


export default function Home() {
  const [form, setForm] = useState('');
  const introText = 'Capture your thoughts, daily experiences, and whatever’s on your mind—privately or shared with those you trust most. Share what matters to you in a way that keeps others informed, without the need for direct conversations.';

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
            : form === 'Our Story' ? <OurStory />
            : <FormTypes formType={handleForm}/>
          }
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>
            {introText}
          </p>
        </div>
        <div className={styles.banner}>
        </div>
      </div>
    </main>
  );
}
