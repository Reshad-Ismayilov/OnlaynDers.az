'use client';
import React from 'react';

// Font Style
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function CoursesAdmin() {
    const courses = [
        {
            id: 1,
            title: 'UX/UI',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nostrum! Quod vel repellat omnis inventore maxime at eligendi, deserunt rerum exercitationem sunt velit minima possimus laboriosam, quis quidem est aliquam.',
            image: '/coursesImg/uxui.png',
        },
        {
            id: 2,
            title: 'UX/UI',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nostrum! Quod vel repellat omnis inventore maxime at eligendi, deserunt rerum exercitationem sunt velit minima possimus laboriosam, quis quidem est aliquam.',
            image: '/coursesImg/uxui.png',
        },
        {
            id: 3,
            title: 'UX/UI',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nostrum! Quod vel repellat omnis inventore maxime at eligendi, deserunt rerum exercitationem sunt velit minima possimus laboriosam, quis quidem est aliquam.',
            image: '/coursesImg/uxui.png',
        },
        {
            id: 4,
            title: 'UX/UI',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nostrum! Quod vel repellat omnis inventore maxime at eligendi, deserunt rerum exercitationem sunt velit minima possimus laboriosam, quis quidem est aliquam.',
            image: '/coursesImg/uxui.png',
        },
    ];

    return (
        <div
            className={`${inter.className} md:bg-[#F1ECEC] max-sm:bg-white md:px-12 max-sm:px-2 py-5`}>
            <div className='bg-white rounded-2xl md:p-10 max-sm:p-2 flex flex-col gap-7'>
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className='bg-[#F1ECEC] rounded-xl flex items-center justify-around md:px-16 max-sm:px-1 max-sm:py-4'>
                        <div className='flex gap-2 items-center'>
                            <img
                                src={course.image}
                                alt={course.title}
                                className='md:w-[27%] max-sm:w-[45%] md:p-7 sm:p-3 max-sm:p-3'
                            />

                            <div className='md:w-[60%] max-sm:w-[100%] flex flex-col gap-3'>
                                <h2 className='font-[700] text-[20px]'>{course.title}</h2>
                                <p className='font-[500] text-[16px] text-[#8D8989]'>
                                    {course.info}
                                </p>
                            </div>
                        </div>

                        <img
                            src='/coursesImg/rightArr.svg'
                            alt=''
                            className='max-sm:hidden md:w-[4%]'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoursesAdmin;
