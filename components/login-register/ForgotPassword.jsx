'use client';
import React, { useContext, useState } from 'react';
import { LoginContext } from './Context';

import { DM_Sans } from 'next/font/google';
const DMSans = DM_Sans({ subsets: ['latin'] });

// Icons
import { X } from 'lucide-react';
import { Mail } from 'lucide-react';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
// import { LoginContext } from './Context';

export default function ForgotPassword() {
	// const { openLogin, setOpenLogin } = useContext(true);
	const [openLogin, setOpenLogin] = useState(true);

	return (
		<Dialog
			open={openLogin}
			onClose={() => setOpenLogin(false)}
			className={`${DMSans.className} relative`}>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-400/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
			/>

			<div className='fixed inset-0 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='relative transform overflow-hidden rounded-lg bg-white h-[45vh] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'>
						<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
							<div className='flex flex-col gap-7 sm:items-start'>
								<div className='w-[100%] flex justify-between '>
									<img
										src='/navImg/nav-img.svg'
										alt='logo'
										className='w-[10%]'
									/>
									<X
										className='w-[3.5%] cursor-pointer'
										onClick={() => setOpenLogin(false)}
									/>
								</div>

								<div className='px-3 flex flex-col gap-6'>
									<p className='text-[16px] text-[#1B1B1B99]'>
										We will send you email that you can cahnge the password
									</p>

									<div className='flex flex-col gap-2'>
										<div className='bg-[#E9ECF3] p-3 flex justify-between rounded-md'>
											<input
												type='email'
												placeholder='Email Address or number'
												id=''
												className='bg-[#E9ECF3] outline-none w-full'
											/>
											<Mail />
										</div>

										<p className='text-[#4267B2] text-[13px] self-end cursor-pointer'>
											Resend code{' '}
											<span className='text-[#00000099]'>in 5 min</span>
										</p>

										<button className='bg-[#3DCBB1] text-white p-2.5 text-center rounded-2xl mt-2'>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
