'use client';
import React from 'react';

function SuccessfulPayment() {
	return (
		<div className='flex flex-col justify-center items-center md:gap-20 max-sm:gap-10 h-[100vh] max-sm:px-2 max-sm:text-center'>
			<h1 className='font-[600] text-[32px]'>
				Ödənişiniz uğurla həyata keçirildi!
			</h1>
			<img
				src='/successfulPayImg/tick.svg'
				alt='Successful Payment'
				className='max-sm:w-[40%]'
			/>
		</div>
	);
}

export default SuccessfulPayment;
