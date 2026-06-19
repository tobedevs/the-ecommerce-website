import React from 'react'
import { useState } from 'react';
import { useAuth } from '../AppContext/AuthContext'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  

  async function HandleButtonClick(e) {
    e.preventDefault();
    if (!email || !password || !username) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!username || username.trim() === "") {
      toast.error("Username is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const loadingToast = toast.loading("Logging you in...");

    try {
      await signup(email , password, username)
      setIsSubmitting(true);
      toast.success("Account created successfully!", { id: loadingToast});
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/homepage');
      }, 1000);


    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to create account due to:" + error.message, { id: loadingToast });
    }
    
  }

  return (
    <div className='flex flex-col justify-center'>
        <h1 className='text-center text-[#1A1A1A] text-3xl sm:text-[50px] font-bold'>Sign Up</h1>
        <p className='text-center text-[#666666] text-[10px] mt-1'>Sign up to create an account and start shopping!!</p>
        <form action="/signup" onSubmit={HandleButtonClick} method="POST" className='flex flex-col gap-4 mt-6 w-[80%] sm:w-[60%] mx-auto'>
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              required
              className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
            <input 
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Email" 
              className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
            <input 
              type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required placeholder="Password" className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-5 ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-500' : ''}`}
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
            <div className="flex gap-2">
              <p>Already have an account? </p>
              <Link to="/Login" className='text-blue-500 hover:underline'>Log in</Link>
            </div>
        </form>
    </div>
  )
}
