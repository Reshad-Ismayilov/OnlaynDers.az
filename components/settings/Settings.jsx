'use client';
import React, { useState } from 'react';
import Background from '../settings/Background';

import { Pencil } from 'lucide-react';

import { Inter } from 'next/font/google';
import Form from './Form';

const inter = Inter({ subsets: ['latin'] });

function Settings() {
	const [profileImage, setProfileImage] = useState('/settingsImg/teacher.png'); // Default image

	const handleProfileImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProfileImage(imageUrl);
		}
	};
	return (
		<div
			className={`${inter.className} md:px-12 sm:px-0 max-sm:p-0 pt-16 md:bg-white`}>
			{/* Background Photo */}
			<div className='relative'>
				<Background />
			</div>

			{/* Info */}
			<div className='bg-white absolute top-[20%] md:left-[7%] max-sm:left-[3%] flex flex-col items-center justify-center md:w-[20%]  max-sm:w-[95%] md:h-[95%] max-sm:py-6 rounded-3xl shadow-xl gap-10'>
				<div className='flex flex-col justify-center items-center gap-4'>
					<img
						src={profileImage}
						alt='Profile Photo'
						className='w-24 h-24 rounded-full object-cover border'
					/>
					<h3 className='font-[600] text-[16px]'>Rəhman Bağırov</h3>
				</div>
				<div className='text-center w-[80%]'>
					<div className='py-2.5 border-b-2'>
						<p className='font-[400] text-[16px]'>Balans: 55 AZN</p>
					</div>
					<div className='py-2.5 border-b-2'>
						<p className='font-[400] text-[16px]'>
							Qatıldığınız tarix: 30.01.2025
						</p>
					</div>
					<div className='py-2.5 border-b-2'>
						<p className='font-[400] text-[16px]'>
							Qoşulduğunuz dərs sayısı: 3
						</p>
					</div>
					<div className='py-2.5 border-b-2'>
						<p className='font-[400] text-[16px]'>
							Ən yüksək statistik göstərici: 62
						</p>
					</div>
				</div>
				<div className='flex flex-col items-center gap-4 max-sm:hidden'>
					<button className='px-6 py-3 text-black border border-solid border-black rounded-full text-[14px] font-[400]'>
						Şəxsi hesabına bax
					</button>

					<button className='w-[70%] text-center px-6 py-3 text-[#FF0000] border border-solid border-[#FF0000] rounded-full text-[14px] font-[400]'>
						Hesabı sil
					</button>
				</div>
			</div>

			{/* Form */}
			<div className='bg-white absolute md:top-[25%] max-sm:top-[82%] md:left-[32%] max-sm:left-[3%] flex flex-col md:w-[61%] max-sm:w-[95%] md:h-[90%] max-sm:h-[133%] rounded-3xl shadow-xl py-7 gap-10 px-10 '>
				<div className='flex flex-col justify-center gap-5'>
					{/* Profile Image */}

					<div className='flex items-center gap-10'>
						<img
							src={profileImage}
							alt='Profile'
							className='w-24 h-24 rounded-full object-cover border'
						/>

						<input
							type='file'
							accept='image/*'
							onChange={handleProfileImageChange}
							className='hidden'
							id='profileInput'
						/>

						<label
							htmlFor='profileInput'
							className='flex items-center gap-2 px-4 py-2 text-black border border-black rounded-full cursor-pointer hover:bg-gray-100'>
							<Pencil className='w-4 h-4' />
							Şəkli dəyiş
						</label>
					</div>
					<h3 className='font-[600] text-[16px]'>Rəhman Bağırov</h3>

					<Form />

					<div className='items-center max-sm:flex md:hidden gap-2 my-5 '>
						<button className='w-[50%] px-6 text-black border border-solid border-black rounded-full text-center text-[14px] font-[400]'>
							Şəxsi hesabına bax
						</button>

						<button className='w-[50%] text-center px-6 py-3 text-[#FF0000] border border-solid border-[#FF0000] rounded-full text-[14px] font-[400]'>
							Hesabı sil
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
