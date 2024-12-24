'use client';
import { useState, useEffect } from "react";

export default function ForgotPassword() {

    return (
        <div>
            <p>Submit your email to reset your password.</p>
            <input placeholder="Email address" />
            <button>Submit</button>
        </div>
    )
}