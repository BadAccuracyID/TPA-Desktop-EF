'use client';

import {LockClosedIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import React, {useState} from "react";
import {register} from "@/components/datastore/firebase/FirebaseController";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let user = await register(email, password);
            console.log('success: ' + user.uid);
            // User successfully logged in, perform any necessary actions or redirect
        } catch (error) {
            setError('Failed!');
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="flex gap-2 items-center mb-4 text-blue-700">
                    <LockClosedIcon className="h-6 w-auto"/>
                    <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                </div>
                <form onSubmit={handleRegister}>
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
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
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
    );
}
