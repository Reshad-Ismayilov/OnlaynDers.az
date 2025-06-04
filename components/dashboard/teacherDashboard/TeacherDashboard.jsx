'use client';
import React from 'react';
import CorporateDashboard from '../corporateDashboard/CorporateDashboard';
import Link from 'next/link';

function TeacherDashboard() {
	const students = [
		{
			id: 1,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
		{
			id: 2,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
		{
			id: 3,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Offline',
		},
		{
			id: 4,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
		{
			id: 5,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
		{
			id: 6,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
		{
			id: 7,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Offline',
		},
		{
			id: 8,
			image: '/dashboardImg/student.png',
			name: 'Sevinc Qasımlı',
			status: 'Online',
		},
	];

	return (
		// <div>
		<aside className='md:w-[25%] sm:w-[97%] max-sm:w-[97%] sm:mx-auto max-sm:mx-auto h-[100%] flex flex-col md:gap-32 sm:gap-24 max-sm:gap-24 md:bg-white sm:bg-[#F1ECEC] max-sm:bg-[#F1ECEC] md:p-4 sm:p-0 max-sm:p-0 rounded-3xl'>
			<div className='flex flex-col gap-8'>
				<h2 className='font-[400] text-[18px] md:block sm:hidden max-sm:hidden'>
					Statistika
				</h2>
				<div className='w-[100%] flex flex-col items-center justify-center gap-4'>
					<img
						src='/dashboardImg/teacher.png'
						alt='teacher'
						className='w-[30%]'
					/>
					<h3 className='font-[500] text-[18px]'>Rəhman Bağırov</h3>
				</div>

				<div className='flex flex-col gap-5 '>
					<Link href={'/addQuestions'}>
						<button className='bg-[#213E82] w-[80%] text-white text-[16px] font-[400] py-5 text-center rounded-full mx-auto'>
							Test hazırla
						</button>
					</Link>
					<Link href={'/addLessons'}>
						<button className='w-[80%] rounded-full text-center mx-auto border-2 border-solid border-[#022270] text-[#022270] text-[16px] font-[400] py-4'>
							Video dərs yüklə
						</button>
					</Link>
					<button className='w-[80%] rounded-full text-center mx-auto border-2 border-solid border-[#022270] text-[#022270] text-[16px] font-[400] py-4'>
						Yüklənən dərslər
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-5 bg-white sm:p-4 max-sm:p-4 rounded-3xl'>
				<div className='flex justify-between items-center'>
					<h2 className='font-[400] text-[18px]'>Tələbələriniz</h2>
					<button className='border-[1px] border-solid border-gray-400 px-[9px] rounded-full text-[20px]'>
						+
					</button>
				</div>

				<div className='flex flex-col gap-5 md:bg-[#E9ECF3] sm:bg-white max-sm:bg-white rounded-3xl px-4 py-7 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#213E82] scrollbar-track-[#FFFFFF] scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
					{students.map((student) => (
						<div key={student.id} className='flex gap-3'>
							<img src={student.image} alt={student.name} className='w-[22%]' />

							<div className='flex flex-col'>
								<p className='font-[400] text-[14px]'>{student.name}</p>
								<p className='font-[400] text-[12px] flex items-center gap-1'>
									<span
										className={`${
											student.status === 'Online'
												? 'text-[#37E80B]'
												: 'text-[#FF0302]'
										}  text-[20px]`}>
										•
									</span>
									{student.status}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
		// </div>
	);
}

export default TeacherDashboard;
