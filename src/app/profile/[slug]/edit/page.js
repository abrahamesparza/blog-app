'use client';
import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter, useSearchParams } from 'next/navigation';

import Navigation from '@/app/components/navigation';
import UploadPhoto from '@/app/components/uploadPhoto';
import styles from '../../profile.module.css';
import Bio from '@/app/components/bio';
import Username from '../../../components/username';
import Password from '../../../components/password';
import FriendRequests from '@/app/components/friendRequests';

export default function Edit() {
    const [option, setOption] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const requests = searchParams.get('requests') || '';

    useEffect(() => {
        let user = localStorage.getItem('loggedInUser');
        setUsername(user);

        if (requests === 'true') {
            setOption('FR');
        }
    }, []);

    const editList = [
        'Upload profile photo',
        'Add bio',
        'Update username',
        'Update password',
        'Friend requests',
    ]

    const handleEditOption = (e) => {
        let text = e.target.innerText;

        if (text === 'Upload profile photo') {
            setOption('Photo');
        }
        else if (text === 'Add bio') {
            setOption('Bio');
        }
        else if (text === 'Update username') {
            setOption('Username');
        }
        else if (text === 'Update password') {
            setOption('Password');
        }
        else if (text === 'Friend requests') {
            setOption('FR');
        }
        setIsEditing(true);
    };

    const renderComponent = () => {
        console.log('option', option)
        switch(option) {
            case 'Photo':
                return <UploadPhoto />
            case 'Bio':
                return <Bio />
            case 'Username':
                return <Username />
                case 'Password':
                    return <Password />
                case 'FR':
                    return <FriendRequests />
            default:
                return null;
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
            {option ? (
                renderComponent()
            ) : (
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
            )}
        </div>
    )
}