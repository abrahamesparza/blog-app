'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosClose } from "react-icons/io";

import styles from '../page.module.css';
import Image from 'next/image';
import { generateProfileImageUrl } from '../helpers/sharedFunctions';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const router = useRouter();

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            setLoading(false)
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`/api/search-users?username=${query}`);
            const data = await response.json();
            const url = data.users.map(user => generateProfileImageUrl(user.id));

            setProfileImageUrl(url)
            setSearchResults(data.users || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileRedirect = (username) => {
        router.push(`/profile/${username}`);
    }

    return (
        <div className={styles.searchContainer}>
            <p 
                onClick={() => setIsOpen(!isOpen)} 
                className={styles.searchButton}
            >
                Search
            </p>
            {isOpen && (
                <div className={styles.searchDropdown}>
                    <div className={styles.searchMenu}>
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={searchQuery} 
                            onChange={(e) => handleSearch(e.target.value)} 
                            className={styles.searchInput}
                        />
                        <IoIosClose 
                            size={28}
                            className={styles.closeButton} 
                            onClick={() => {
                                setSearchQuery('');
                                setSearchResults([]);
                                setIsOpen(false);
                            }}
                        />
                    </div>
                    {loading ? (
                        <p className={styles.loadingMessage}>Loading...</p>
                    ) : searchQuery && searchResults.length === 0 ? (
                        <p className={styles.noResults}>No results found.</p>
                    ) : ( searchResults.length > 0 && (
                        <ul className={styles.searchResults}>
                            {searchResults.map((user, index) => (
                                <div className={styles.searchResultItem}>
                                    <Image
                                    src={profileImageUrl[index]}
                                    alt={`${user.username}'s profile`}
                                    width={100}
                                    height={100}
                                    className={styles.searchProfileImage}/>
                                    <li  key={user.id} onClick={() => handleProfileRedirect(user.username)}>
                                        {user.username}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    ) 
                    )}
                </div>
            )}
        </div>
    );
}
