'use client'

import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import styles from "./page.module.css";

import Menu from './components/menu';
import Form from "./components/form";

const testData = ['TEST', 'TEST', 'TEST'];

export default function Home() {
  return (
    <main>
      <div className={styles.homePage}>
        <div className={styles.banner}>
          <h1>MARKETPLACE</h1>
          <Menu />
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselItems}>
            <ul className={styles.unorderedList}>
              {testData.map(item => (
                <li key={1} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Form/>
        </div>
      </div>
    </main>
  );
}
