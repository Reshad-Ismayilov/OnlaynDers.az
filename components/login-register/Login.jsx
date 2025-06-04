'use client';
import React, { useState, useEffect } from 'react';
import { DM_Sans } from 'next/font/google';
const DMSans = DM_Sans({ subsets: ['latin'] });

import { X, Mail, LockKeyhole } from 'lucide-react';
import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { API_URL } from '@/app/apiconfig';

export default function Login() {
  const [openLogin, setOpenLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { handleLogin, error } = useAuth();


  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check if the user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required!';
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format!';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required!';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters!';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          // Store accessToken and refreshToken in localStorage
          // localStorage.setItem('accessToken', data.accessToken);
          // localStorage.setItem('refreshToken', data.token);
          handleLogin(data.accessToken,data.token, "sanan")

          setOpenLogin(false);
          router.push('/dashboard'); // Redirect after login
        } else {
          setErrors({ email: 'Invalid credentials', password: '' });
        }
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={openLogin}
      onClose={() => setOpenLogin(false)}
      className={`${DMSans.className} relative z-[99999999]`}>
      <DialogBackdrop className='fixed inset-0 bg-gray-400/75' />
      <div className='fixed inset-0 z-[99999999] w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='flex flex-col gap-7 sm:items-start'>
                <div className='w-[100%] flex justify-between'>
                  <img src='/navImg/nav-img.svg' alt='logo' className='w-[10%]' />
                  <X className='w-[3.5%] cursor-pointer' onClick={() => setOpenLogin(false)} />
                </div>

                <div className='px-3 flex flex-col gap-6'>
                  <p className='text-[16px] text-[#1B1B1B99]'>
                    Join us and get more benefits. We promise to keep your data safely.
                  </p>

                  <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${errors.email ? 'border-red-500' : 'border-transparent'}`}>
                      <input
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#E9ECF3] outline-none w-full'
                      />
                      <Mail />
                    </div>
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

                    <div className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${errors.password ? 'border-red-500' : 'border-transparent'}`}>
                      <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#E9ECF3] outline-none w-full'
                      />
                      <LockKeyhole />
                    </div>
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

                    <p className='text-[#4267B2] text-[13px] self-end cursor-pointer'>Forgot your password?</p>

                    <button type='submit' className='bg-[#3DCBB1] text-white p-2.5 text-center rounded-2xl mt-2' disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
