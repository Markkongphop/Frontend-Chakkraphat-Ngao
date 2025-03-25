// src/app/register/page.tsx
'use client';

import RegisterForm from '@/components/RegisterForm';
import React, { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState<string | null>(null); // For messages

    const handleRegister = async () => {
        try {
            const result = await RegisterForm(name, telephone, email, password);
            setMessage("Registration successful!");
            console.log("Registration successful:", result);
            // Optionally, redirect the user or clear the form
        } catch (error) {
            setMessage(`Registration failed: ${(error as Error).message}`);
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                {message && <p className={message.startsWith("Registration failed") ? "text-red-500" : "text-green-500"}>{message}</p>}
                <form className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="Telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="User"
                            disabled
                            className="w-full px-4 py-2 border rounded bg-gray-200 text-gray-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;