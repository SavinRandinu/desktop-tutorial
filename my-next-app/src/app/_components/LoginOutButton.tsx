"use client";
import React from 'react';
import { logoutAction } from '../actions/auth';
import { useRouter } from 'next/navigation';

const LoginOutButton = () => {
    const router = useRouter();
    const handleLogOut = async () => {
        try {
            // 1. call the server action to log out
            // 2. have a client fallback in case the server action fails
            await logoutAction();
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer" onClick={handleLogOut}>
            Logout
        </button>
    );
};

export default LoginOutButton;