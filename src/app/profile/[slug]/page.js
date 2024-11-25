'use client';

import { useState, useEffect } from "react";
import styles from '../profile.module.css';
import Navigation from "@/app/components/navigation";

export default function Profile({ username, title, content, }) {
    return (
      <div>
        {/* navigation div */}
        {/* container with two children in grid column */}
          {/* 1st child displays data in a row 
          - name
          - about
          - list of blogs
          */}
          {/* 2nd child displays data in a row
          - profile poto
          - # of followers
          - name
          - edit profile link
          - list of following (paginate to 5) */}
          <Navigation />
      </div>
    );
  }