import { Field, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                const { user, accessToken, refreshToken } = data;
                
                // Store the user data and token in context
                login(accessToken, refreshToken, user);

                // Navigate based on user role
                if (user.role === 'seller') {
                    navigate('/seller-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                let errorMessage = 'Invalid credentials';

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || 'Invalid credentials';
                } catch (error) {
                    errorMessage = 'Invalid credentials';
                }

                setError(errorMessage);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            <div className="flex w-full items-center justify-center p-4 md:p-8">
                <div className="flex w-full flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg max-w-4xl">
                    {/* Left Section - Blue Sidebar */}
                    <div className="bg-blue-700 text-white p-8 flex flex-col w-full md:w-1/2">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-2">Welcome to</h2>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13 18.94V21h-2v-2.06c-4.17-.46-7.48-3.77-7.94-7.94H1v-2h2.06c.46-4.17 3.77-7.48 7.94-7.94V1h2v2.06c4.17.46 7.48 3.77 7.94 7.94H23v2h-2.06c-.46 4.17-3.77 7.48-7.94 7.94zM12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0-10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold">Spacer</span>
                                </div>
                            </div>
                            
                            <p className="text-sm opacity-75 mt-auto">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed 
                                cursus magna at venenatis mattis. Morbi eget convallis nisl.
                            </p>
                            
                            <div className="mt-8 flex gap-4 text-xs">
                                <a href="#" className="underline">COMPANY INFO</a>
                                <a href="#" className="underline">CONTACT INFO</a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Section - Login Form */}
                    <div className="bg-white p-8 w-full md:w-1/2">
                        <div className="flex flex-col h-full">
                            <div className="mb-6 mt-4">
                                <h1 className="text-2xl font-bold text-gray-800">Welcome to</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="bg-blue-700 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13 18.94V21h-2v-2.06c-4.17-.46-7.48-3.77-7.94-7.94H1v-2h2.06c.46-4.17 3.77-7.48 7.94-7.94V1h2v2.06c4.17.46 7.48 3.77 7.94 7.94H23v2h-2.06c-.46 4.17-3.77 7.48-7.94 7.94zM12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0-10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-700">Spacer</span>
                                </div>
                            </div>
                            
                            <form className="flex flex-col w-full" onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="text-sm text-gray-600 mb-1 block">E-mail Address</label>
                                    <Field>
                                        <Input
                                            id="email"
                                            className={clsx(
                                                'block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-gray-800',
                                                'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30'
                                            )}
                                            placeholder="Enter your email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Field>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="password" className="text-sm text-gray-600 mb-1 block">Password</label>
                                    <Field>
                                        <Input
                                            id="password"
                                            className={clsx(
                                                'block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-gray-800',
                                                'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30'
                                            )}
                                            placeholder="Enter your password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Field>
                                </div>

                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                <div className="flex items-center mb-4">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                                        Stay signed in
                                    </label>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button 
                                        type="submit" 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    
                                    <button 
                                        type="button" 
                                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
                                        onClick={() => navigate('/register')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;