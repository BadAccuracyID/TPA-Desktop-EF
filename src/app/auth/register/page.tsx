'use client';

import {LockClosedIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import React, {useState} from "react";
import {initUserData, register} from "@/components/datastore/firebase/FirebaseManager";
import NavBarCard from "@/components/card/NavBarCard";

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validations
        if (name.length === 0) {
            setError('Username is required');
            return;
        }
        if (email.length === 0) {
            setError('Email is required');
            return;
        }
        if (password.length === 0) {
            setError('Password is required');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        if (confirmPassword !== password) {
            setError('Passwords do not match');
            return;
        }

        // actual register
        try {
            register(email, password)
                .then(credential => {
                    return initUserData(credential.user.uid, name, email);
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setError('Email already in use');
                            break;
                        case 'auth/invalid-email':
                            setError('Invalid email');
                            break;
                        case 'auth/weak-password':
                            setError('Weak password');
                            break;
                        default:
                            setError('Registration failed');
                            break;
                    }
                })
        } catch (error) {
            setError('Registration failed!');
            console.log(error);
        }
    };

    return (
        <div>
            <NavBarCard/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex gap-2 items-center mb-4 text-blue-700">
                        <LockClosedIcon className="h-6 w-auto"/>
                        <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
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
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Confirm Password
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-center mb-6">
                            <label className="text-red-600 m-1 h-3">
                                {error}
                            </label>
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Register
                            </button>
                            <Link
                                href="/auth/login"
                                className="text-sm py-2 rounded focus:outline-none focus:shadow-outline">
                                <text>
                                    Already have an account?&nbsp;
                                </text>
                                <text className="text-blue-700 font-bold">
                                    Login here.
                                </text>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
