'use client';

import userRegister from '@/libs/userRegister';
import React, { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            const result = await userRegister(name, telephone, email, password);
            setMessage("Registration successful!");
            console.log("Registration successful:", result);
            
        } catch (error) {
            setMessage(`Registration failed: ${(error as Error).message}`);
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 p-6 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 to-transparent blur-3xl opacity-60"></div>
            
            <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Create an Account</h2>
                {message && <p className={`text-sm text-center mb-4 ${message.startsWith("Registration failed") ? "text-red-400" : "text-green-400"}`}>{message}</p>}
                <form className="space-y-5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white border-gray-600"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white border-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white border-gray-600"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white border-gray-600"
                    />
                    <input
                        type="text"
                        placeholder="User Type"
                        disabled
                        className="w-full px-4 py-3 border rounded-lg bg-gray-700 text-gray-400 shadow-sm cursor-not-allowed border-gray-600"
                    />
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;