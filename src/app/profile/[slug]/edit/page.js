'use client';
import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import Navigation from '@/app/components/navigation';
import UploadPhoto from '@/app/components/uploadPhoto';
import styles from '../../profile.module.css';

export default function Edit() {
    const [option, setOption] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
        let user = localStorage.getItem('loggedInUser');
        setUsername(user);
    })

    const editList = [
        'Upload a photo',
        'Add a note about yourself',
        'Update username',
        'Update password',
    ]

    const handleEditOption = (e) => {
        let text = e.target.innerText;
        if (text === 'Upload a photo') {
            setOption('Photo');
        }
        else if (text === 'Add a note aout yourself') {
            setOption('About');
        }
        else if (text === 'Update username') {
            setOption('Username');
        }
        else if (text === 'Update password') {
            setOption('Password');
        }
        setIsEditing(true);
    };

    const renderComponent = () => {
        switch(option) {
            case 'Photo':
                return <UploadPhoto />
            default:
                return;
        }
    }

    const updateEditingStatus = () => {
        if (isEditing) {
            setIsEditing(false);
            setOption(null);
        }
        else {
            router.push(`/profile/${username}`);
        }
    };

    return (
        <div className={styles.profile}>
            <Navigation />
            <div className={styles.editContainer}>
                <IoIosArrowRoundBack className={styles.backButton} onClick={updateEditingStatus} size={28} />
            </div>
            <div className={styles.editContainer} style={{ display: isEditing ? 'none' : 'block' }}>
                <div className={styles.selectOptionText}>
                    <h3>Select an option to edit</h3>
                </div>
                <div className={styles.editList}>
                    <ul>
                        {editList.map((item, index) => (
                            <li
                            key={index}
                            className={styles.editItems}
                            onClick={handleEditOption}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {renderComponent()}
        </div>
    )
}