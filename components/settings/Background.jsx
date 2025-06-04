'use client';
import { useState } from 'react';
import { Camera } from 'lucide-react';

export default function BackgroundChanger() {
	const [backgroundImage, setBackgroundImage] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setBackgroundImage(imageUrl);
		}
	};

	return (
		<div
			className='relative bg-[#BAC3D8] w-[100%] md:h-[200px] max-sm:h-[250px] rounded-b-3xl'
			style={{
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			{/* Hidden File Input */}
			<input
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className='hidden'
				id='fileInput'
			/>

			{/* Button at the Top Right */}
			<label
				htmlFor='fileInput'
				className='absolute md:top-8 max-sm:top-20 md:right-10 max-sm:right-4 flex items-center gap-2 px-4 py-2 text-[12px] font-[600] text-white bg-[#D9D9D980] border rounded-full shadow cursor-pointer hover:bg-gray-300'>
				<Camera className='w-4 h-4' />
				Change Background
			</label>
		</div>
	);
}
