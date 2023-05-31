'use client';

import {LockClosedIcon} from "@heroicons/react/20/solid";
import React, {useState} from "react";
import {forgotPassword} from "@/components/datastore/firebase/FirebaseController";
import Link from "next/link";

export default function Page() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validations
        if (email.length === 0) {
            setError('Email is required');
            return;
        }

        // actual login
        try {
            forgotPassword(email).then(() => {
                setError('Password reset email sent')
            }).catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid email');
                        break;
                }
            })
        } catch (error) {
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="flex gap-2 items-center mb-4 text-blue-700">
                    <LockClosedIcon className="h-6 w-auto"/>
                    <h2 className="text-2xl font-bold text-gray-800">Password Reset</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex items-center justify-center mb-6">
                        <label className="text-red-600 m-1 h-3">
                            {error}
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Send Reset Email
                        </button>

                        <Link
                            className="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-800 mb-2"
                            href="/auth/login">
                            Back to Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
