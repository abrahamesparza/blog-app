'use client';
import { useState, useEffect, useId } from "react";
import { usePathname } from "next/navigation";
import { CiSettings } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { IoPersonAdd } from "react-icons/io5";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Image from "next/image";

import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";
import BlogItem from "@/app/components/blogItem";
import BackButton from "@/app/components/backButton";

export default function Profile() {
  const pathName = usePathname();
  const username = pathName.split('/')[2];
  const [blogs, setBlogs] = useState([]);
  const [bio, setBio] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profileExists, setProfileExists] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showView, setShowView] = useState('public');
  const [friendRequests, setFriendRequests] = useState([]);
  const [iconVisibility, setIconVisibility] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(storedUser);
    }
    setProfileImageUrl(generateProfileImageUrl());
    getBlogs();
    getFriendRequests();
  }, [userId, iconVisibility]);

  const generateProfileImageUrl = () => {
    if (!userId) {
      return;
    }
    return `https://users-pfp.s3.amazonaws.com/profiles/${userId}/profile.jpg?timestamp=${Date.now()}`;
  };

  const togglePrivateBlogs = (e) => {
    let view = e.target.innerText;
    if (view === 'Public') setShowView('public');
    else setShowView('private');
  };

  const filteredBlogs = blogs.filter(item => 
    showView === 'private' ? item.privacy === 'private' : item.privacy === 'public' || !item.privacy
  );

  const getBlogs = async () => {
    try {
      const response = await fetch(`/api/get-user-data?username=${username}`);
      const data = await response.json();

      if (data.message === 404) {
        setProfileExists(false);
      }

      else {
        setBlogs(data.blogs || []);
        setBio(data.bio);
        setUserId(data.id);
        setProfileExists(true);
      }
      setLoading(false);
    }
    catch (error) {
      console.error('Error', error);
      setLoading(false);
    }
  };

  const handleBlogRoute = async (e) => {
    let blogTitle = e.target.innerText;
    router.push(`/blog/${blogTitle}?username=${username}`);
  };

  const handleEditRoute = () => {
    router.push(`/profile/${username}/edit`);
  };

  const routeBack = () => {
    router.push('/landing');
  };

  const addFriend = async () => {
    const data = {
      username: username,
      loggedInUser: loggedInUser,
    }
    const response = await fetch('/api/add-friend', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    setFriendRequests(prevRequests => [...prevRequests, ...result.data]);
  };

  const getFriendRequests = async () => {
    try {
      const response = await fetch(`/api/get-friend-requests?username=${username}`);
      const data = await response.json();

      if (data.error) console.error('Error fetching friend requets');
      if (data.friendRequests.includes(loggedInUser)) setIconVisibility(false);

      setFriendRequests(data.friendRequests);
    }
    catch (error) {
      console.error('Error fetching friend requests.');
    }
  };

  console.log('friend requests', friendRequests);

  return (
    <div className={styles.profile}>
      <Navigation />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.profileChildOne}>
            <p>Loading...</p>
          </div>
        ) : profileExists === false ? (
          <div className={styles.profileChildOne}>
            <BackButton routeBack={routeBack}/>
            <div className={styles.addFriendBlock}>
              <h3 className={styles.username}>@{username}</h3>
            </div>
            <div className={styles.blogList}>
                <h1 className={styles.doesNotExist}>User does not exist.</h1>
            </div>
          </div>
        ) : (
          <div className={styles.profileChildOne}>
            <BackButton routeBack={routeBack}/>
            <div className={styles.profileImageContaier}>
                <Image
                  src={profileImageUrl}
                  alt={`${username}'s profile`}
                  width={100}
                  height={100}
                  className={styles.profileImage}
                />
            </div>
            <div className={styles.addFriendBlock}>
              <h3 className={styles.username}>@{username}</h3>
              {!friendRequests.includes(loggedInUser) ? (
                <IoPersonAdd
                size={22}
                className={styles.addIcon}
                onClick={addFriend}
                />
              ) : (
                <div className={styles.requestSentContainer}>
                  <AiOutlineCheckCircle size={22} className={styles.requestSentIcon} />
                  <p>Request Sent</p>
                </div>
              )}
            </div>
            {/* 
            // Update to display friends instead //
            <div className={styles.follows}>
              <p>700 Followers</p>
              <p>300 Following</p>
            </div> */}
            <div className={styles.aboutContainer}>
              <p className={styles.aboutText}>{bio}</p>
            </div>
            
            <div className={styles.blogList}>
              <div className={styles.blogHeaderContainer}>
                <h3 className={styles.blogHeader}>Blogs</h3>
                  <div className={styles.entriesList}>
                    <p
                    className={`${styles.privateTab} ${showView === 'public' ? styles.activeTab : ''}`}
                    onClick={togglePrivateBlogs}
                    >
                      Public
                    </p>
                    {username === loggedInUser && (
                      <p
                      className={`${styles.privateTab} ${showView === 'private' ? styles.activeTab : ''}`}
                      onClick={togglePrivateBlogs}
                      >
                        Private
                      </p>
                    )}
                  </div>
              </div>
              {filteredBlogs.length > 0 ? (
                <ul className={styles.blogUl}>
                  {filteredBlogs.map((item, index) => (
                    <BlogItem
                      key={index}
                      title={item.title}
                      content={item.content}
                      timestamp={item.timestamp}
                      handleBlogRoute={handleBlogRoute}
                      username={username}
                    />
                  ))}
                </ul>
              ) : (
                <p>No blogs available</p>
              )}
            </div>
          </div>
        )}

        <div className={styles.profileChildTwo}>
          {loggedInUser === username ? <CiSettings className={styles.settingsIcon} onClick={handleEditRoute} size={25} /> : null}
        </div>

      </div>
    </div>
  );
};