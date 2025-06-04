'use client';
import React, { useState } from 'react';

import { X } from 'lucide-react';

// Font Style
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function AddQuestion() {
	const [questions, setQuestions] = useState([
		// {
		// 	id: 1,
		// 	question: 'Lorem ipsum dolor sit amet consectetur.',
		// },
	]);

	// const [newQuestion, setNewQuestion] = useState('');
	// const [a, setA] = useState('');
	// const [b, setB] = useState('');
	// const [c, setC] = useState('');
	// const [d, setD] = useState('');

	// Function to add a new question
	const handleAddQuestion = () => {
		setQuestions((prev) => [
			...prev,
			{
				id: prev.length + 1,
				question: '',
				options: { a: '', b: '', c: '', d: '' },
			},
		]);
	};

	// Function to update a specific question
	const handleQuestionChange = (id, value) => {
		setQuestions((prev) =>
			prev.map((q) => (q.id === id ? { ...q, question: value } : q))
		);
	};

	const handleQuestionDelete = (id) => {
		setQuestions((prev) => prev.filter((q) => q.id !== id));
	};

	// Function to update a specific answer option
	const handleOptionChange = (id, option, value) => {
		setQuestions((prev) =>
			prev.map((q) =>
				q.id === id ? { ...q, options: { ...q.options, [option]: value } } : q
			)
		);
	};

	return (
		<div
			className={`${inter.className} flex flex-col gap-[70px] md:px-12 sm:px-4 max-sm:px-4`}>
			<h2 className='font-[700] text-[24px] text-center'>
				Lorem ipsum dolor sit amet consectetur.
			</h2>

			{/* Map through questions array */}
			{questions.map((q, index) => (
				<div
					key={q.id}
					className='flex flex-col justify-between shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-5 md:px-12 gap-5 rounded-3xl'>
					<div>
						<div className='flex gap-4'>
							<h3 className='font-[600] text-[20px]'>{index + 1}. </h3>
							<input
								type='text'
								value={q.question}
								onChange={(e) => handleQuestionChange(q.id, e.target.value)}
								className='outline-none w-[100%]'
								placeholder='Sual daxil edin'
							/>
							<X
								onClick={() => handleQuestionDelete(q.id)}
								className='cursor-pointer'
							/>
						</div>
						<div className='w-[55%] border-[1px] border-black mt-2'></div>
					</div>

					<div>
						<form action='' className='flex flex-col gap-5'>
							{['A', 'B', 'C', 'D'].map((option, i) => (
								<div key={i} className='inline-flex items-center'>
									<label
										className='relative flex items-center justify-center cursor-pointer'
										htmlFor={`${q.id}${option}`}>
										<input
											name={`question-${q.id}`}
											type='radio'
											className='peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-black checked:border-black transition-all'
											id={`${q.id}${option}`}
										/>
										<span className='absolute bg-slate-800 w-4 h-4 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></span>
									</label>
									<label
										className='ml-2 text-black text-[14px] font-[400] cursor-pointer ps-5'
										htmlFor={`${q.id}${option}`}>
										<input
											type='text'
											value={q.options[option]}
											onChange={(e) =>
												handleOptionChange(q.id, option, e.target.value)
											}
											className='outline-none'
											placeholder={`Variant ${option.toUpperCase()}`}
										/>
									</label>
								</div>
							))}
						</form>
					</div>
				</div>
			))}

			<div className='flex justify-center'>
				<button
					onClick={handleAddQuestion}
					className='bg-[#213E82] py-0 px-9 text-white text-[25px] font-[400] md:w-[10%] text-center rounded-2xl mb-5'>
					+
				</button>
			</div>

			<div className='flex justify-end'>
				<button className='bg-[#213E82] py-1 px-3 text-white text-[22px] font-[400] md:w-[10%] text-center rounded-2xl mb-5'>
					Hazırla
				</button>
			</div>
		</div>
	);
}

export default AddQuestion;
