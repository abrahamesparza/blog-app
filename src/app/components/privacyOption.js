'use client';
import styles from '../write/write.module.css';

export default function PrivacyOption({ option }) {
    return (
        <div className={styles.selectDropDown}>
            <select onChange={option} required className={styles.select}>
                <option value="" disabled>Select an option</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </select>
        </div>
    );
};