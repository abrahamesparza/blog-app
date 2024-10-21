'use client'

import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import SignupForm from "./components/signup/signupForm";
import LoginForm from "./components/login/loginForm";
import FormTypes from "./components/formTypes";


export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState('');

  function handleForm(e) {
    let formType = e.target.innerText;
    console.log('form type: ', formType)
    setForm(formType)
  }

  function updateForm(formType) {
    setForm(formType)
  }

  function handleSignup() {
    console.log('in handle signup')
    router.push('/signup');
  };

  function handleLogin() {
    console.log('in handle login')
    router.push('/login');
  };

  return (
    <main>
      <div className={styles.homePage}>
        <div className={styles.banner}>
        </div>
        <div>
          {
            form === 'Sign Up' ? <SignupForm onClick={handleSignup} formType={updateForm}/>
            : form === 'Log In' ? <LoginForm onClick={handleLogin} formType={updateForm}/>
            : <FormTypes formType={handleForm}/>
          }
        </div>
      </div>
    </main>
  );
}
