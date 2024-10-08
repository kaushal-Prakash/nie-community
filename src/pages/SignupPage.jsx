import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Input, Button } from '../components/components';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const user = await authService.createAccount(email, pass);
            if (user) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            console.log("Signup Error: ", error);
        }
    };

    return (
        <div className='h-screen flex items-center justify-center p-1 sm:p-20'>
            <form onSubmit={handleSignup} className="w-full max-w-lg p-12 bg-transparent border-2 border-amber-50 rounded-lg shadow-md glowing-border sm:w-full">
                <Input
                    label="Your email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter Your Email"
                    className="mb-4"
                />
                <Input
                    label="Your password"
                    type="password"
                    value={pass}
                    name="password"
                    onChange={(e) => setPass(e.target.value)}
                    id="password"
                    placeholder="Password (atleast 8 characters)"
                    className="mb-4"
                />
                <Button type="submit" text="Submit" />
            </form>
        </div>
    );
}

export default SignupPage;
