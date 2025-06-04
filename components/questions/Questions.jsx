'use client';
import React from 'react';

// Font Style
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function Questions() {
	const questions = [
		{
			id: 1,
			question: 'Lorem ipsum dolor sit amet consectetur?',
			options: [
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
			],
		},
		{
			id: 2,
			question: 'Lorem ipsum dolor sit amet consectetur?',
			options: [
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
			],
		},
		{
			id: 3,
			question: 'Lorem ipsum dolor sit amet consectetur?',
			options: [
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
				'Lorem ipsum dolor sit amet consectetur.',
			],
		},
	];

	return (
		<div
			className={`${inter.className} flex flex-col gap-[70px] md:px-12 sm:px-4 max-sm:px-4`}>
			<h2 className='font-[700] text-[24px] text-center'>
				Lorem ipsum dolor sit amet consectetur.
			</h2>

			{/* Questions */}
			<div className='flex flex-col gap-7'>
				{questions.map((ques) => (
					<div
						key={ques.id}
						className='flex flex-col justify-between shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-5 md:px-12 gap-5 rounded-3xl'>
						<div>
							<h3 className='font-[600] text-[20px]'>
								{ques.id}. {ques.question}
							</h3>
							<div className='w-[55%] border-[1px] border-black mt-2'></div>
						</div>

						<div>
							<form action='' className='flex flex-col gap-5'>
								{ques.options.map((opt, i) => {
									const inputId = `q${ques.id}-opt${i}`;
									return (
										<div key={i} className='inline-flex items-center'>
											<label
												className='relative flex items-center justify-center cursor-pointer'
												htmlFor={inputId}>
												<input
													name='framework'
													type='radio'
													className='peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-black checked:border-black transition-all'
													id={inputId}
												/>
												<span className='absolute bg-slate-800 w-4 h-4 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></span>
											</label>
											<label
												className='ml-2 text-black text-[14px] font-[400] cursor-pointer ps-5'
												htmlFor={inputId}>
												{opt}
											</label>
										</div>
									);
								})}
							</form>
						</div>
					</div>
				))}
			</div>

			<div className='flex justify-end'>
				<button className='bg-[#F03737] py-2 px-8 text-white text-[16px] font-[400] md:w-[3%] text-center rounded-2xl mb-5'>
					Bitir
				</button>
			</div>
		</div>
	);
}

export default Questions;
