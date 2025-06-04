'use client';
import React from 'react';

// Font Style
import { Sora } from 'next/font/google';
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

const sora = Sora({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const DMSans = DM_Sans({ subsets: ['latin'] });

function Tests() {
	const tests = [
		{
			id: 1,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 2,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 3,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 4,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 5,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 6,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
		{
			id: 7,
			field: 'UX/UI',
			info: '	Lorem ipsum dolor sit amet consectetur. Aenean turpis nunc enim venenatis faucibus at sollicitudin sit. Neque duis amet in amet quisque arcu. Phasellus justo quis morbi semper ut et. Ac tristique	sapien nullam ullamcorper risus.',
		},
	];

	return (
		<div
			className={`${inter.className} flex flex-col gap-[40px] md:px-12 sm:px-4 max-sm:px-4 mx-auto`}>
			<form
				className={`flex items-center md:justify-start sm:justify-center max-sm:justify-center sm:gap-1 max-sm:gap-1 md:gap-3 mt-5`}>
				<select className='md:w-[250px] sm:w-[200px] max-sm:w-[200px] md:px-4 sm:px-3 max-sm:px-2 py-3 rounded-3xl bg-[#F9F9F9E5] text-[#1B1B1B99] focus:outline-none md:text-[16px] sm:text-[14px] max-sm:text-[14px] font-[400]'>
					<option value=''>Kurslar və s.</option>
					<option value=''>Front-End</option>
					<option value=''>UX/UI</option>
					<option value=''>Back-End</option>
				</select>
				<select className='md:w-[250px] sm:w-[200px] max-sm:w-[200px] md:px-4 sm:px-3 max-sm:px-2 py-3 rounded-3xl bg-[#F9F9F9E5] text-[#1B1B1B99] focus:outline-none md:text-[16px] sm:text-[14px] max-sm:text-[14px] font-[400]'>
					<option value=''>Kateqoriyalar</option>
					<option value=''>IT Sahəsi</option>
					<option value=''>Təhsil Sahəsi</option>
				</select>
				<button className='w-[100px] px-6 py-[5.5px] rounded-3xl text-center bg-[#213E82] text-white md:text-[20px] sm:text-[18px] max-sm:text-[18px] font-[400]'>
					Axtar
				</button>
			</form>

			{tests.map((test) => (
				<div
					key={test.id}
					className='flex justify-between shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-5 md:px-12 gap-5 rounded-3xl'>
					<img
						src='/testsImg/test.svg'
						alt='Test Icon'
						className='md:w-[5%] sm:w-[15%] max-sm:w-[15%]'
					/>

					<div className='w-[80%]'>
						<h2 className='font-[600] md:text-[28px] sm:text-[25px] max-sm:text-[25px]'>
							{test.field}
						</h2>
						<p className='font-[400] md:text-[18px] sm:text-[16px] max-sm:text-[16px]'>
							{test.info}
						</p>
					</div>

					<img src='/testsImg/rightArr.svg' alt='Include' />
				</div>
			))}
		</div>
	);
}

export default Tests;
