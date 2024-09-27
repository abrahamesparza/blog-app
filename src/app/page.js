'use client'

import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import styles from "./page.module.css";

import Menu from './components/menu';
import SignupForm from "./components/signupForm";
import LoginForm from "./components/loginForm";
import FormTypes from "./components/formTypes";

const testData = ['TEST', 'TEST', 'TEST'];

export default function Home() {
  const [form, setForm] = useState('');

  async function handleForm(e) {
    let formType = e.target.innerText;
    console.log('form type: ', formType)
    setForm(formType)
  }

  async function updateForm(formType) {
    setForm(formType)
  }

  async function resetHome() {
    setForm('');
  }

  return (
    <main>
      <div className={styles.homePage}>
        <div className={styles.banner}>
          <h1 onClick={resetHome}>MARKETPLACE</h1>
          <Menu />
        </div>
        <div>
          {
            form === 'Sign Up' ? <SignupForm formType={updateForm}/>
            : form === 'Log In' ? <LoginForm formType={updateForm}/>
            : <FormTypes formType={handleForm}/>
          }
        </div>
      </div>
    </main>
  );
}
