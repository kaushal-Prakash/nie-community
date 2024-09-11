import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';
import {Input,Button} from '../components/components';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const user = await authService.createAccount(email,pass);
            if(user){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/");
            }

        } catch (error) {
            console.log("Signup Error : ",error);
        }
    }
    return (
        <div className='h-screen p-60'>
            <form onSubmit={handleSignup} className="max-w-sm mx-auto p-12 rounded-xl border-2 border-amber-50">
                <Input
                    label="Your email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter Your Email"
                />
                <Input
                    label="Your password"
                    type="password"
                    value={pass}
                    name="password"
                    onChange={(e) => setPass(e.target.value)}
                    id="password"
                    placeholder="Enter Your Password"
                />
                <Button type="submit" text="Submit" />
            </form>
    </div>
    );
}

export default SignupPage