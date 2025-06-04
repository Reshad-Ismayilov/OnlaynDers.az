'use client';
import React from 'react';

// Font Style
import { Sora } from 'next/font/google';
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

const sora = Sora({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const DMSans = DM_Sans({ subsets: ['latin'] });

function UserComments() {
	const comments = [
		{
			id: 1,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
		{
			id: 2,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
		{
			id: 3,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
		{
			id: 4,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
		{
			id: 5,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
		{
			id: 6,
			userName: 'Leyla Əliyeva',
			comment:
				'"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"',
			userImg: '/homeImg/user1.png',
		},
	];

	return (
		<div className='md:px-12 sm:px-5 max-sm:px-5 flex flex-col md:gap-[80px] sm:gap-[50px] max-sm:gap-[50px]'>
			<h1
				className={`${inter.className} md:text-[64px] sm:text-[40px] max-sm:text-[40px] font-[500] text-center`}>
				İstifadəçi Rəyləri
			</h1>

			<div className='md:grid md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-6'>
				{comments?.map((cmt) => (
					<div
						key={cmt.id}
						className='border rounded-xl shadow-lg sm:mb-8 max-sm:mb-8 '>
						<div className='p-10 bg-[#DEE2EC] rounded-t-xl'>
							<p className='font-[400] text-[16px] text-[#4C4C4D]'>
								{cmt.comment}
							</p>
						</div>
						<div className='flex items-center gap-3 bg-[#FCFCFD] border-t px-10 py-6 rounded-b-lg'>
							<img
								className='w-[50px] rounded-lg'
								src={cmt.userImg}
								alt={cmt.userName}
							/>
							<p className='font-[600] text-[16px]'>{cmt.userName}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default UserComments;
