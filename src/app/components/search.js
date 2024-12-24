'use client';
import { useState } from 'react';
import styles from '../page.module.css';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/api/search-users?username=${query}`);
            const data = await response.json();
            setSearchResults(data.users);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

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
                                <li 
                                    key={user.id} 
                                    className={styles.searchResultItem}
                                    onClick={() => console.log(`Selected user: ${user.username}`)}
                                >
                                    {user.username}
                                </li>
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
