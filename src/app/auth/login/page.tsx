'use client';

import {LockClosedIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import React, {useState} from "react";
import {signIn} from "@/components/datastore/firebase/FirebaseManager";
import NavBarCard from "@/components/card/NavBarCard";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState('');

    const handleRememberMeChange = () => {
        setRememberMe((rememberMe) => !rememberMe);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validations
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

        // actual login
        try {
            signIn(email, password)
                .then(credentials => {
                    console.log(credentials.user);
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                        case 'auth/wrong-password':
                        case 'auth/user-not-found':
                            setError('Invalid email or password');
                            break;
                        case 'auth/user-disabled':
                            setError('User disabled, contact support');
                            break;
                        default:
                            setError('Login failed');
                            break;
                    }
                });
        } catch (error) {
            setError('Login failed');
            console.log(error)
        }
    };

    return (
        <div>
            <NavBarCard/>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex gap-2 items-center mb-4 text-blue-700">
                        <LockClosedIcon className="h-6 w-auto"/>
                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                    </div>
                    <form onSubmit={handleLogin}>
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
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-500"
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                        />
                                        <span className="ml-2 text-gray-700 text-sm">Remember Me</span>
                                    </label>
                                </div>

                                <Link
                                    className="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-800 mb-2"
                                    href="/auth/forgot">
                                    Forgot Password?
                                </Link>
                            </div>
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
                                Sign In
                            </button>
                            <Link
                                href="/auth/register"
                                className="text-sm py-2 rounded focus:outline-none focus:shadow-outline">
                                <text>
                                    Don&apos;t have an account?&nbsp;
                                </text>
                                <text className="text-blue-700 font-bold">
                                    Register here.
                                </text>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
