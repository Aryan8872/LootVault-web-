import { Field, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext/AuthContext';


const Login = () => {
    const navigate = useNavigate();  // Initialize useNavigate hook

    const { login } = useAuth(); // Access the login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
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
                console.log(accessToken)



                // Store the user data and token in context
                login(accessToken, refreshToken,user);

                // Check the user's role and navigate accordingly
                if (user.role === 'seller') {
                    // Navigate to seller dashboard if the user is a seller
                    navigate('/seller-dashboard');
                } else {
                    // Navigate to the home route for buyers or users
                    navigate('/');
                }
            } else {
                let errorMessage = 'Invalid credentials';

                // Handle the error from the backend response
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || 'Invalid credentials';
                } catch (error) {
                    console.log(error)
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
        <div className="flex w-full h-full">
            <div className='flex gap-5 items-center justify-center bg-[#605A70] px-8 w-full h-screen'>
                <div className="flex bg-[#2A2738] rounded-lg shadow-[-8px_12px_17px_4px_] w-[60%] h-[70%] py-3 px-4">
                    <section className="overflow-hidden w-[45%] flex flex-[1] h-[100%]">
                        <div className="rounded-2xl h-[100%] ">
                            <img
                                src="https://images.unsplash.com/photo-1738696693336-7a24cea4e6f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
                                className="object-cover rounded-xl"
                            />
                        </div>
                    </section>

                    <section className="flex flex-[1.2] flex-col items-center pt-20">
                        <div className="flex">
                            <h1 className="font-nunitobold text-[2rem] text-[white]">Login to your account</h1>
                        </div>

                        <div className="flex  w-full h-full px-16 ">
                            <form className="flex flex-col w-full h-full mt-7" onSubmit={handleLogin}>
                                <div className="w-full max-w-sm ">
                                    <Field>
                                        <Input
                                            className={clsx(
                                                'mt-3 block w-full rounded-lg border-none bg-[#3C364C] py-2.5 px-3 text-1rem text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 '
                                            )}
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Field>
                                </div>

                                <div className="w-full max-w-sm ">
                                    <Field>
                                        <Input
                                            className={clsx(
                                                'mt-3 block w-full rounded-lg border-none bg-[#3C364C] py-2.5 px-3 text-1rem text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 '
                                            )}
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Field>
                                </div>

                                {error && <p className="text-red-500 mt-2">{error}</p>}

                                <div>
                                    <button type="submit" className="text-white mt-5">Login</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Login;
