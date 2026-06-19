import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AppContext/AuthContext';
import toast from 'react-hot-toast';

export default function LogInPage() {
  const { login } = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function HandleButtonClicked(e) {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const loadingToast = toast.loading("Logging you in...");
    try {
      setIsSubmitting(true);
      await login(email, password);
      toast.success("Welcome back!", { id: loadingToast });

      setTimeout(() => {
        navigate('/homepage');
      }, 1500);
    } catch (error) {
      toast.error("Login failed: " + error.message, { id: loadingToast });
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex flex-col justify-center'>
        <h1 className='text-center text-[#1A1A1A] text-3xl sm:text-[50px] font-bold'>Welcome Back!!</h1>
        <p className='text-center text-[#666666] text-[10px] mt-1'>Sign in to your account and continue shopping!!</p>
        
        <form action="/login" onSubmit={HandleButtonClicked} method="POST" className='flex flex-col gap-4 mt-6 w-[80%] sm:w-[60%] mx-auto'>
           
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Email" 
              className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Password" 
              className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-5 ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-500' : ''}`}
            >
              {isSubmitting ? "Processing..." : "Log In"}
            </button>
            
            <div className="flex gap-2">
              <p>Do not have an account? </p>
              <Link to="/" className='text-blue-500 hover:underline'>Sign Up</Link>
            </div>
        </form>
    </div>
  )
}