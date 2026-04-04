"use client"; // this is a client component
import React, { useEffect } from 'react';
import { loginAction } from '../actions/auth';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [state, formAction] = useFormState(loginAction, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/contact');
        }
    }, [state, router]);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
            </div>
            <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
            </div>
            <button type="submit" className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
            </button>
            {state?.error && <p className="mt-3 text-red-600 text-sm">{state.error}</p>}
        </form>
    );
};

export default LoginForm;