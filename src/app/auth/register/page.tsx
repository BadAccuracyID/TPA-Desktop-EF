'use client';

import {LockClosedIcon, XMarkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import React, {useState} from "react";
import {initUserData, register, signIn} from "@/components/datastore/firebase/FirebaseManager";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [redOutput, setRedOutput] = useState(true);
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRedOutput(true);

        // validations
        if (name.length === 0) {
            setMessage('Username is required');
            return;
        }
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
        if (confirmPassword !== password) {
            setMessage('Passwords do not match');
            return;
        }

        // actual register
        try {
            setRedOutput(false);
            setMessage('Registering user...');

            register(email, password)
                .then(credential => {
                    initUserData(credential.user.uid, name, email);
                    signIn(email, password, false).then(() => {
                        router.push('/dashboard');
                    })
                })
                .catch(error => {
                    setRedOutput(true);
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setMessage('Email already in use');
                            break;
                        case 'auth/invalid-email':
                            setMessage('Invalid email');
                            break;
                        case 'auth/weak-password':
                            setMessage('Weak password');
                            break;
                        default:
                            setMessage('Registration failed');
                            break;
                    }
                })
        } catch (error) {
            setRedOutput(true);
            setMessage('Registration failed!');
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

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
                            Register
                        </button>
                        <Link
                            href="/auth/login"
                            className="text-sm py-2 rounded focus:outline-none focus:shadow-outline hover:text-blue-800">
                            <text>
                                Already have an account?&nbsp;
                            </text>
                            <text className="text-blue-700 font-bold duration-150">
                                Login here.
                            </text>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
