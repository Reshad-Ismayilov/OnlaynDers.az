'use client';
import React, { useContext, useState } from 'react';

import { DM_Sans } from 'next/font/google';
const DMSans = DM_Sans({ subsets: ['latin'] });

// Icons
import { X } from 'lucide-react';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

export default function FourDigitsCode() {
	// const { openLogin, setOpenLogin } = useContext(true);
	const [openLogin, setOpenLogin] = useState(true);

	return (
		<Dialog
			open={openLogin}
			onClose={() => setOpenLogin(false)}
			className={`${DMSans.className} relative z-[99999999]`}>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-400/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
			/>

			<div className='fixed md:inset-0 max-sm:top-0 z-[99999999] w-screen overflow-y-auto'>
				<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='relative transform overflow-hidden rounded-lg bg-white h-[40vh] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'>
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

								<div className='px-3 flex flex-col gap-6 w-[100%]'>
									<p className='text-[16px] text-[#1B1B1B99]'>
										Enter 4 digit code that we send you
									</p>

									<div className='flex w-[100%]'>
										<div className='bg-[#fff] p-3 flex justify-between rounded-md'>
											<input
												type='text'
												id=''
												className='bg-[#E9ECF3] outline-none w-[20%] h-20 rounded-xl'
											/>
											<input
												type='text'
												id=''
												className='bg-[#E9ECF3] outline-none w-[20%] h-20 rounded-xl'
											/>
											<input
												type='text'
												id=''
												className='bg-[#E9ECF3] outline-none w-[20%] h-20 rounded-xl'
											/>
											<input
												type='text'
												id=''
												className='bg-[#E9ECF3] outline-none w-[20%] h-20 rounded-xl'
											/>
										</div>
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
