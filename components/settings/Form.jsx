'use client';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';

export default function Form() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='bg-white rounded-lg w-full md:p-6 max-sm:p-0'>
			<div className='grid md:grid-cols-2 max-sm:grid-cols-1 gap-x-24 gap-y-12'>
				<div>
					<label className='block text-gray-700 mb-1'>Ad</label>
					<input
						type='text'
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3]'
						defaultValue='Rəhman'
					/>
				</div>
				<div>
					<label className='block text-gray-700 mb-1'>Soyad</label>
					<input
						type='text'
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3]'
						defaultValue='Bağırov'
					/>
				</div>
				<div className='relative'>
					<label className='block text-gray-700 mb-1'>Şifrə</label>
					<input
						type={showPassword ? 'text' : 'password'}
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3] pr-10'
						defaultValue='rehman1995'
					/>
					<span
						className='absolute top-10 right-3 cursor-pointer text-gray-600'
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <Eye /> : <EyeClosed />}
					</span>
				</div>
				<div>
					<label className='block text-gray-700 mb-1'>Telefon nömrəsi</label>
					<input
						type='text'
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3]'
						defaultValue='+994 77 871 62 78'
					/>
				</div>
				<div>
					<label className='block text-gray-700 mb-1'>E-mail ünvanı</label>
					<input
						type='email'
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3]'
						defaultValue='Rehmanbagirov@gmail.com'
					/>
				</div>
				<div>
					<label className='block text-gray-700 mb-1'>Kart nömrəsi</label>
					<input
						type='text'
						className='w-full p-3 border border-black rounded-lg bg-[#E9ECF3]'
						defaultValue='6127 8716 3892 5405'
					/>
				</div>
			</div>
			<button className='mt-8 md:w-[15%] max-sm:w-full bg-[#213E82] text-white p-3 rounded-full text-[16px] text-center font-[400] hover:bg-[#1A2E5F] transition'>
				Yadda saxla
			</button>
		</div>
	);
}
