'use client';
import React, { useState } from 'react';

// Font Style
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';

function CourseInfo() {
	const lesson = [
		{
			id: 1,
			title: 'Habitant pulvinar velit at sed egestas netus',
			info: 'Habitant pulvinar velit at sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus',
			image: '/courseInfoImg/black.png',
		},
		{
			id: 2,
			title: 'Habitant pulvinar velit at sed egestas netus',
			info: 'Habitant pulvinar velit at sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus',
			image: '/courseInfoImg/black.png',
		},
		{
			id: 3,
			title: 'Habitant pulvinar velit at sed egestas netus',
			info: 'Habitant pulvinar velit at sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus',
			image: '/courseInfoImg/black.png',
		},
		{
			id: 4,
			title: 'Habitant pulvinar velit at sed egestas netus',
			info: 'Habitant pulvinar velit at sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus',
			image: '/courseInfoImg/black.png',
		},
		{
			id: 5,
			title: 'Habitant pulvinar velit at sed egestas netus',
			info: 'Habitant pulvinar velit at sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer faucibus',
			image: '/courseInfoImg/black.png',
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div
			className={`${inter.className} bg-[#F1ECEC] md:px-12 md:py-4 max-sm:px-0`}>
			<div className='bg-white md:px-8 max-sm:px-0 flex flex-col gap-[60px]'>
				<div className='flex md:flex-row max-sm:flex-col items-center max-sm:gap-6'>
					<div className='flex md:flex-row max-sm:flex-col items-center gap-7 md:p-4 max-sm:py-4'>
						<img
							src='/courseInfoImg/uxui.png'
							alt='UX/UI'
							className='md:w-[25%] max-sm:w-[55%] shadow-2xl'
						/>
						<div className='md:w-[50%] max-sm:w-[80%] flex flex-col gap-3'>
							<h2 className='font-[600] text-[32px]'>UX/UI Design</h2>
							<p className='font-[500] text-[18px] text-[#8D8989]'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
								error culpa optio reprehenderit explicabo architecto delectus
								neque incidunt eum rerum porro enim, libero repudiandae
								consectetur dicta nesciunt, sit amet? Suscipit.
							</p>
						</div>
					</div>

					<button
						onClick={() => setOpen(!open)}
						className='flex justify-center items-center bg-[#213E82] md:w-[400px] py-2 sm: max-sm:w-[200px] rounded-3xl text-white text-center font-[400] text-[20px]'>
						Dərsə qoşul
					</button>
				</div>

				<div className='flex items-center justify-around'>
					<img src='/courseInfoImg/img1.png' alt='' className='w-[22%]' />
					<img src='/courseInfoImg/img2.png' alt='' className='w-[22%]' />
					<img src='/courseInfoImg/img3.png' alt='' className='w-[22%]' />
					<img src='/courseInfoImg/img4.png' alt='' className='w-[22%]' />
				</div>

				<h2 className='text-center font-[600] text-[36px]'>Video dərs</h2>

				<div className='flex items-center md:flex-row sm:flex-col max-sm:flex-col gap-8'>
					<div className='bg-black md:w-[50%] sm:w-[93%] max-sm:w-[93%] md:h-[365px] sm:h-[250px] max-sm:h-[250px] rounded-3xl'></div>
					<div className='md:w-[50%] sm:w-[93%] max-sm:w-[93%] flex flex-col gap-5'>
						<h3 className='font-[600] text-[32px]'>
							Lorem ipsum dolor sit amet consectetur
						</h3>
						<p className='font-[500] text-[#777373] text-[18px]'>
							Habitant pulvinar velit at sed egestas. Netus sed nunc id odio.
							Venenatis tempor sagittis egestas lobortis.Nec morbi amet integer
							faucibus condimentum.Venenatis tempor sagittis egestas
							lobortis.Nec morbi amet integer faucibus.Venenatis tempor sagittis
							egestas lobortis.Nec morbi amet integer. Habitantpulvinar velit at
							sed egestas. Netus sed nunc id odio. Venenatis tempor sagittis
							egestas lobortis.Nec morbi amet integer faucibus
							condimentum.Venenatis tempor sagittis egestas lobortis.Nec morbi
							amet integer faucibus.Venenatis tempor sagittis egestas
							lobortis.Nec morbi amet integer faucibus
						</p>
					</div>
				</div>

				<div className='flex flex-col md:gap-6 pb-4  max-sm:gap-24'>
					{lesson.map((lesson) => (
						<div
							key={lesson.id}
							className='flex md:flex-row max-sm:flex-col	 items-center gap-6'>
							<div className='relative md:w-[20%] max-sm:w-[70%]'>
								<img src={lesson.image} alt={lesson.title} />
								<img
									src='/courseInfoImg/Lock.svg'
									alt=''
									className='absolute top-[33%] left-[40%]'
								/>
							</div>

							<div className='md:w-[70%] sm:w-[50%] max-sm:w-[80%] flex flex-col gap-4'>
								<h3 className='font-[600] text-[26px]'>{lesson.title}</h3>
								<p className='font-[500] text-[18px]/6 text-[#777373]'>
									{lesson.info}
								</p>
							</div>
						</div>
					))}

					<img
						src='/courseInfoImg/bottomArr.svg'
						alt=''
						className='w-[4%] mx-auto'
					/>
				</div>
			</div>

			<Dialog open={open} onClose={setOpen} className='relative z-10 '>
				<DialogBackdrop
					transition
					className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
				/>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<DialogPanel
							transition
							className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[45%] data-closed:sm:translate-y-0 data-closed:sm:scale-95 '>
							<div className='bg-white !md:px-12 !md:py-10 max-sm:px-5 max-sm:py-5 sm:px-5 sm:py-5'>
								<div className='sm:flex sm:items-start'>
									<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<h3 className='text-base font-[600] !text-[24px]'>
											UX/UI dərsləri
										</h3>
										<div className='mt-2 flex flex-col gap-5'>
											<p className='text-[16px] font-[400] text-[#323232]'>
												Lorem ipsum dolor sit amet consectetur. Semper senectus
												id ut amet. Mattis tempus suspendisse ipsum amet felis
												pharetra lorem tempor. Sit mauris arcu tincidunt urna
												netus. Suspendisse laoreet turpis turpis urna pharetra
												nullam. Sit mauris arcu tincidunt urna netus.Suspendisse
												laoreet turpis turpis urna pharetra nullam.
											</p>

											<div className='flex'>
												<p className='w-[100%]'>Tədris olunacaq proqramlar:</p>
												<p>
													Figma, FigJam, Adobe İllustrator, Adobe Photoshop,
													Google Analitic
												</p>
											</div>

											<div className='flex items-center justify-between'>
												<p className='text-[#213E82] font-[400] text-[16px]'>
													Tədris qiyməti: 9000 AZN
												</p>
												<button className='bg-[#213E82] md:px-24 md:py-2.5 sm:px-16 max-sm:px-16 rounded-2xl font-[400] text-[16px] text-white'>
													Ödəniş et
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</div>
	);
}

export default CourseInfo;
