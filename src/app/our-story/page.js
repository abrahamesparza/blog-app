'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from './our-story.module.css';
import FormTypes from "../components/formTypes";
import BackButton from "../components/backButton";

export default function OurStory() {
    const router = useRouter();

    function handleForm(e) {
        let formType = e.target.innerText;
        setForm(formType)
    }

    function routeBack() {
        router.push('/');
    }

    return (
        <div>
            <FormTypes formType={handleForm}/>
            <div className={styles.backButtonContainer}>
                <BackButton className={styles.backButton} routeBack={routeBack}/>
            </div>
            <div className={styles.storyContainer}>
                <div className={styles.storyText}>
                    <p className={styles.storyP}>Journaling is a powerful tool for self-expression. It allows us to capture our raw emotions, experiences, and the moments that shape our lives. In a world where expressing ourselves can sometimes feel like a burden, writing becomes a release — a way to unburden our minds and create space for growth and reflection. The act of journaling frees us, and over time, we’re able to look back on our entries and see how far we’ve come.</p>
                    <p className={styles.storyP}>Whether you prefer to keep your entries private or share them with friends for support and encouragement, the choice is yours. You have full control over how your thoughts are shared and preserved.</p>
                </div>
            </div>
        </div>
    )
}