'use client';

import {LockClosedIcon, XMarkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import React, {useState} from "react";
import {signIn, signOutUser} from "@/components/datastore/firebase/FirebaseManager";
import {useRouter} from "next/navigation";
import {getAccount} from "@/components/datastore/local/UserManager";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [redOutput, setRedOutput] = useState(true);
    const [message, setMessage] = useState('');

    const handleRememberMeChange = () => {
        setRememberMe((rememberMe) => !rememberMe);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRedOutput(true);

        // validations
        if (email.length === 0) {
            setMessage('Email is required');
            return;
        }
        if (password.length === 0) {
            setMessage('Password is required');
            return;
        }
        if (password.length < 6) {
            setMessage('Password must be at least 6 characters');
            return;
        }

        // actual login
        try {
            setRedOutput(false);
            setMessage('Signing in...');

            signIn(email, password, rememberMe)
                .then((user) => {
                    getAccount(user.user.uid).then((account) => {
                        if (!account.isVerified()) {
                            signOutUser();
                            setRedOutput(true);
                            setMessage('Account not verified. Contact an administrator.');
                            return;
                        }

                        router.push('/dashboard');
                    });
                })
                .catch(error => {
                    setRedOutput(true);
                    switch (error.code) {
                        case 'auth/invalid-email':
                        case 'auth/wrong-password':
                        case 'auth/user-not-found':
                            setMessage('Invalid email or password');
                            break;
                        case 'auth/user-disabled':
                            setMessage('User disabled, contact support');
                            break;
                        default:
                            setMessage('Login failed');
                            break;
                    }
                });
        } catch (error) {
            setRedOutput(true);
            setMessage('Login failed');
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

                <div className="absolute right-1 top-1">
                    <Link
                        href={'/'}
                        className="focus:outline-none">
                        <div className="flex items-center gap-1 text-black text-sm font-semibold">
                            <XMarkIcon className="w-8 text-red-600"/>
                        </div>
                    </Link>
                </div>

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
                                className="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-800 mb-2 duration-150"
                                href="/auth/forgot">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                        {redOutput && (
                            <label className="text-red-600 m-1 h-3">{message}</label>
                        )}
                        {!redOutput && (
                            <label className="text-green-500 m-1 h-3">{message}</label>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-150"
                            disabled={!redOutput}
                            type="submit">
                            Sign In
                        </button>
                        <Link
                            href="/auth/register"
                            className="text-sm py-2 rounded focus:outline-none focus:shadow-outline hover:text-blue-800">
                            <span>
                                Don&apos;t have an account?&nbsp;
                            </span>
                            <span className="text-blue-700 font-bold duration-150">
                                Register here.
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
