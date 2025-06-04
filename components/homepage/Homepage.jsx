'use client';
import React, { useContext } from 'react';
// import { GraduationCap, Handshake, Users, BookOpen } from 'lucide-react';

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { motion } from 'framer-motion';

// Font Style
import { Sora } from 'next/font/google';
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import { LoginContext } from '../login-register/Context';
import Login from '../login-register/Login';

const sora = Sora({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const DMSans = DM_Sans({ subsets: ['latin'] });

function Homepage() {
	const { openLogin, setOpenLogin } = useContext(LoginContext);

	const stats = [
		{
			icon: '/homeImg/trained.svg',
			value: '3K+',
			text: 'Successfully Trained',
		},
		{
			icon: '/homeImg/completed.svg',
			value: '15K+',
			text: 'Classes Completed',
		},
		{ icon: '/homeImg/rate.svg', value: '97K+', text: 'Satisfaction Rate' },
		{
			icon: '/homeImg/community.svg',
			value: '102K+',
			text: 'Students Community',
		},
	];

	// Carousel
	const responsiveComment = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	const responsiveCollaboration = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 6,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 6,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 4,
		},
	};

	return (
		<div className='flex flex-col gap-[70px]'>
			{/* First */}
			<div className='pt-20'>
				<div className='bg-[#BAC3D8] w-full flex items-center justify-between md:pb-[150px] py-11 sm:flex-col-reverse max-sm:flex-col-reverse md:flex-row'>
					<div className='md:w-[40%] flex flex-col gap-6 md:ps-14 md:mt-0 md:px-0 sm:w-[100%] max-sm:w-[100%] sm:mt-7 max-sm:mt-7 sm:px-4 max-sm:px-4'>
						<h1
							className={`${DMSans.className} text-white md:text-[50px] sm:text-[32px] max-sm:text-[32px] font-[700]`}>
							Grow your community with Salestar
						</h1>
						<p
							className={`${inter.className} font-[300] md:text-[22px] sm:text-[14px] max-sm:text-[14px] text-gray-900`}>
							CourseKit is a flexible learning management system (LMS) template
							with everything you need to sell video content. Create an entire
							catalogue or just a single course and sell subscriptions with
							ease!
						</p>
					</div>

					<div className='md:w-[50%] flex relative md:justify-start  sm:w-[95%] sm:justify-center max-sm:w-[95%] max-sm:justify-center'>
						<img
							src='/homeImg/Group 7074.png'
							alt=''
							className='w-[25%] absolute z-[-1] md:right-[85%] md:bottom-10 sm:right-[75%] sm:-bottom-4 max-sm:right-[75%] max-sm:-bottom-4'
						/>
						<img
							src='/homeImg/Video.png'
							alt='Homepage Video'
							className='w-[80%] '
						/>
						<img
							src='/homeImg/dots.png'
							alt=''
							className='md:w-[10%] md:h-[20%] sm:w-[20%] sm:h-[40%] max-sm:w-[20%] max-sm:h-[40%] absolute z-[-1] md:right-[20%] md:-top-5 sm:right-0 sm:top-0 max-sm:right-5 max-sm:-top-2'
						/>
					</div>
				</div>
				<div className='bg-white w-[85%] p-5 m-auto -mt-12 rounded-2xl shadow-md sm:hidden max-sm:hidden md:block'>
					<p
						className={`${DMSans.className} text-gray-700 font-[400] text-[20px] mb-3 ps-3`}>
						Nə öyrənmək istəyirsən?
					</p>

					<div className='flex items-center p-2 rounded-2xl shadow-md bg-gray-100 border-gray-200 border-[3px]'>
						<input
							type='text'
							placeholder='Kurslar və s.'
							className='flex-grow bg-transparent px-4 py-2 outline-none text-gray-600 '
						/>
						<button
							className={`${inter.className} bg-blue-900 text-white px-8 mr-10 py-2 rounded-xl text-[16px] font-[400]`}>
							Axtar
						</button>
					</div>
				</div>
			</div>

			<div className='px-5 flex flex-col gap-[70px]'>
				{/* About Us */}
				<div
					className={`${sora.className} w-full md:px-16 sm: max-sm:px-1 flex justify-between md:flex-row sm:flex-col-reverse max-sm:flex-col-reverse`}>
					<div className='md:relative w-[25%]'>
						<img
							src='/homeImg/thumb-4-1.131cebea9da8704ba859.jpg.png'
							className='w-[80%] shadow-lg z-[-1]'
							alt='Background'
						/>

						<img
							src='/homeImg/thumb-4-2.605d56c40d61e41bd521.jpg.png'
							className='w-[80%] md:absolute z-10 top-[25%] left-[50%] shadow-lg'
							alt='Overlay'
						/>
					</div>

					<div className='md:w-[50%] sm:w-[98%] max-sm:w-[98%] flex flex-col gap-10'>
						<div className='flex flex-col gap-3'>
							<h2
								className={`${DMSans.className} md:text-[48px] sm:text-[32px] max-sm:text-[32px] text-[#213E82] font-[700]`}>
								ABOUT US
							</h2>
							<p
								className={`${DMSans.className} text-[32px] font-[700] text-[#0E2A46] md:block sm:hidden max-sm:hidden`}>
								We are always ensure best course for your learning
							</p>
							<p className='font-[400] md:text-[16px]/8 sm:text-[14px]/7 max-sm:text-[14px]/7  text-[#4D5756] '>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi.
							</p>
						</div>

						<div
							className={`${inter.className} flex items-start md:gap-9 max-sm:gap-3`}>
							<div className='w-[60px] h-[60px] bg-[#213E82] rounded-lg flex justify-center items-center'>
								<img src='/homeImg/screen.svg' alt='' />
							</div>
							<div className='w-[80%] flex flex-col gap-1'>
								<h3 className='font-[700] md:text-[17px] sm:text-[24px] max-sm:text-[24px] text-[#0E2A46]'>
									Sharing a Screen
								</h3>
								<p className='font-[400] text-[#333931] md:text-[17px]/8 sm:text-[14px]/7 max-sm:text-[14px]/7'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do tempor incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
						</div>

						<div
							className={`${inter.className} flex items-start md:gap-9 max-sm:gap-3`}>
							<div className='w-[60px] h-[60px] bg-[#213E82] rounded-lg flex justify-center items-center'>
								<img src='/homeImg/screen.svg' alt='' />
							</div>
							<div className='w-[80%] flex flex-col gap-1'>
								<h3 className='font-[700] md:text-[17px] sm:text-[24px] max-sm:text-[24px] text-[#0E2A46]'>
									Sharing a Screen
								</h3>
								<p className='font-[400] text-[#333931] md:text-[17px]/8 sm:text-[14px]/7 max-sm:text-[14px]/7'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do tempor incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
						</div>

						<button className='w-[208px] h-[61px] bg-[#213E82] rounded-lg flex justify-center items-center text-white'>
							Daha Çox
						</button>
					</div>
				</div>

				<div className='bg-[#BAC3D8] md:w-[90%] sm:w-[100%] max-sm:w-[100%] rounded-[70px] md:py-8 md:px-6 mx-auto flex justify-around items-center my-20'>
					{stats.map((stat, index) => (
						<div
							key={index}
							className='w-[100%] flex gap-4 items-center justify-center text-center'>
							<div className='bg-white p-4 rounded-full flex items-center justify-center shadow-md'>
								<img src={stat.icon} alt={stat.text} />
							</div>
							<div className='flex flex-col justify-center text-start gap-1'>
								<h2 className='text-[#EB472B] font-[700] text-[35px] mt-3'>
									{stat.value}
								</h2>
								<p
									className={`${sora.className} text-[#0E2A46] text-[17px] font-[370]`}>
									{stat.text}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* User Comment */}
				<div className='w-full md:px-16 sm:px-0 max-sm:px-0'>
					<h2
						className={`${DMSans.className} font-[600] md:text-[38px] sm:text-[32px] max-sm:text-[32px] text-[#262626] mb-3`}>
						İstifadəçi rəyləri
					</h2>
					<div className='md:flex justify-between sm:hidden max-sm:hidden max-sm:w-[100%] sm:w-[100%]'>
						<p
							className={`${inter.className} font-[400] text-[16px] text-[#59595A] w-[70%]`}>
							Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
							eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
							cum eget habitasse in velit fringilla feugiat senectus in.
						</p>
						<button className='w-[130px] h-[45px] bg-[#213E82] rounded-lg flex justify-center items-center text-white'>
							Hamısına bax
						</button>
					</div>

					<div className='md:my-14 sm:my-7 max-sm:my-7 mx-auto w-full0 md:px-4 sm:p-0 max-sm:p-0 '>
						{/* Desktop */}
						<div className='hidden md:grid grid-cols-2 gap-6'>
							<div className='border rounded-lg shadow-lg'>
								<div className='p-6'>
									<p className='font-[400] text-[16px] text-[#4C4C4D]'>
										"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
										artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı,
										həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"
									</p>
								</div>
								<div className='flex items-center gap-3 bg-[#FCFCFD] border-t px-6 py-4'>
									<img
										className='w-[50px] rounded-full'
										src='/homeImg/user1.png'
										alt='User'
									/>
									<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
								</div>
							</div>

							<div className='border rounded-lg shadow-lg'>
								<div className='p-6'>
									<p className='font-[400] text-[16px] text-[#4C4C4D]'>
										"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
										artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı,
										həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"
									</p>
								</div>
								<div className='flex items-center gap-3 bg-[#FCFCFD] border-t px-6 py-4'>
									<img
										className='w-[50px] rounded-full'
										src='/homeImg/user1.png'
										alt='User'
									/>
									<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
								</div>
							</div>

							<div className='border rounded-lg shadow-lg'>
								<div className='p-6'>
									<p className='font-[400] text-[16px] text-[#4C4C4D]'>
										"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
										artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı,
										həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"
									</p>
								</div>
								<div className='flex items-center gap-3 bg-[#FCFCFD] border-t px-6 py-4'>
									<img
										className='w-[50px] rounded-full'
										src='/homeImg/user1.png'
										alt='User'
									/>
									<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
								</div>
							</div>

							<div className='border rounded-lg shadow-lg'>
								<div className='p-6'>
									<p className='font-[400] text-[16px] text-[#4C4C4D]'>
										"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
										artıb. Müasir metodlarla təqdim olunan dərslər həm maraqlı,
										həm də asan başa düşüləndir. Ən yaxşı seçimim oldu!"
									</p>
								</div>
								<div className='flex items-center gap-3 bg-[#FCFCFD] border-t px-6 py-4'>
									<img
										className='w-[50px] rounded-full'
										src='/homeImg/user1.png'
										alt='User'
									/>
									<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
								</div>
							</div>
						</div>

						{/* Mobile Carousel */}
						<div className='md:hidden'>
							<Carousel
								responsive={responsiveComment}
								autoPlay={false}
								draggable={true}
								swipeable={true}
								removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
								infinite={false}>
								<div className='border rounded-2xl shadow-lg bg-[#DEE2EC] w-[100%]'>
									<div className='p-3'>
										<p className='font-[400] text-[16px] text-[#4C4C4D]'>
											"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
											artıb. Müasir metodlarla təqdim olunan dərslər həm
											maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim
											oldu!"
										</p>
									</div>
									<div className='flex items-center gap-3 bg-[#DEE2EC] border-t px-6 py-4 rounded-lg'>
										<img
											className='w-[50px] rounded-full'
											src='/homeImg/user1.png'
											alt='User'
										/>
										<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
									</div>
								</div>

								<div className='border rounded-2xl shadow-lg bg-[#DEE2EC] w-[100%]'>
									<div className='p-3'>
										<p className='font-[400] text-[16px] text-[#4C4C4D]'>
											"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
											artıb. Müasir metodlarla təqdim olunan dərslər həm
											maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim
											oldu!"
										</p>
									</div>
									<div className='flex items-center gap-3 bg-[#DEE2EC] border-t px-6 py-4 rounded-lg'>
										<img
											className='w-[50px] rounded-full'
											src='/homeImg/user1.png'
											alt='User'
										/>
										<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
									</div>
								</div>

								<div className='border rounded-2xl shadow-lg bg-[#DEE2EC] w-[100%]'>
									<div className='p-3'>
										<p className='font-[400] text-[16px] text-[#4C4C4D]'>
											"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
											artıb. Müasir metodlarla təqdim olunan dərslər həm
											maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim
											oldu!"
										</p>
									</div>
									<div className='flex items-center gap-3 bg-[#DEE2EC] border-t px-6 py-4 rounded-lg'>
										<img
											className='w-[50px] rounded-full'
											src='/homeImg/user1.png'
											alt='User'
										/>
										<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
									</div>
								</div>

								<div className='border rounded-2xl shadow-lg bg-[#DEE2EC] w-[100%]'>
									<div className='p-3'>
										<p className='font-[400] text-[16px] text-[#4C4C4D]'>
											"Bu platforma sayəsində övladımın dərslərdə uğurları xeyli
											artıb. Müasir metodlarla təqdim olunan dərslər həm
											maraqlı, həm də asan başa düşüləndir. Ən yaxşı seçimim
											oldu!"
										</p>
									</div>
									<div className='flex items-center gap-3 bg-[#DEE2EC] border-t px-6 py-4 rounded-lg'>
										<img
											className='w-[50px] rounded-full'
											src='/homeImg/user1.png'
											alt='User'
										/>
										<p className='font-[600] text-[16px]'>Leyla Əliyeva</p>
									</div>
								</div>
							</Carousel>
						</div>
					</div>
				</div>

				{/* Collaboration */}
				<div
					className={`${inter.className} sm:p-0 max-sm:p-0 md:px-12 flex flex-col items-center gap-7`}>
					<h2
						className={`md:text-[20px] max-sm:text-[32px] sm:text-[32px] font-[500] w-[100%]`}>
						Partnyorlarımız
					</h2>

					<div className='w-full flex flex-col items-center md:my-10 sm:my-0 max-sm:my-0'>
						{/* Desktop View (Row Layout) */}
						<div className='hidden md:flex w-[80%] items-center justify-center gap-4'>
							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>

							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>

							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>

							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>

							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>

							<div className='flex flex-col gap-4 items-center justify-center'>
								<img
									src='/homeImg/pashabank.png'
									alt='Pasha Bank logo'
									className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
								/>
								<p>Pasha Bank</p>
							</div>
						</div>

						{/* Mobile View (Carousel) */}
						<div className='md:hidden w-[100%]'>
							<Carousel
								responsive={responsiveCollaboration}
								autoPlay={false}
								draggable={true}
								swipeable={true}
								removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
								infinite={false}>
								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>

								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>

								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>

								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>

								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>

								<div className='flex flex-col gap-4 items-center justify-center'>
									<img
										src='/homeImg/pashabank.png'
										alt='Pasha Bank logo'
										className='w-[90%] bg-[#E9ECF3] p-4 shadow-lg shadow-gray-400 rounded-[30px]'
									/>
									<p className='text-center'>Pasha Bank</p>
								</div>
							</Carousel>
						</div>
					</div>
				</div>
			</div>
			{openLogin && <Login />}
		</div>
	);
}

export default Homepage;
