'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../page.module.css';
import Image from 'next/image';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/api/search-users?username=${query}`);
            const data = await response.json();
            console.log('data', data);
            setSearchResults(data.users || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
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
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchQuery} 
                        onChange={(e) => handleSearch(e.target.value)} 
                        className={styles.searchInput}
                    />
                    {searchResults.length > 0 && (
                        <ul className={styles.searchResults}>
                            {searchResults.map((user) => (
                                <div>
                                    {/* WIP: Add image next to username */}
                                    {/* <Image
                                    src={generateProfileImage}
                                    alt={`${username}'s profile`}
                                    width={100}
                                    height={100}
                                    className={styles.profileImage}/> */}
                                    <li  key={user.id}  className={styles.searchResultItem} onClick={() => handleProfileRedirect(user.username)}>
                                        {user.username}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    )}
                    {searchQuery && searchResults.length === 0 && (
                        <p className={styles.noResults}>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
