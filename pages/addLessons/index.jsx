'use client';
import React, { useState } from 'react';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

function AddLesson() {
	const [items, setItems] = useState([{ id: 0, image: null }]); // Start with one div

	// Function to add a new div
	const addNewDiv = () => {
		setItems([...items, { id: items.length, image: null }]);
	};

	// Function to handle image upload
	const handleImageUpload = (index, event) => {
		const file = event.target.files[0]; // Get the first selected file
		if (file) {
			const newItems = [...items];
			newItems[index].image = URL.createObjectURL(file); // Create image preview URL
			setItems(newItems);
		}
	};

	const handleLessonDelete = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const [headerImage, setHeaderImage] = useState(null);

	// Function to handle image upload
	const handleHeaderImageUpload = (event) => {
		const file = event.target.files[0]; // Get the first selected file
		if (file) {
			setHeaderImage(URL.createObjectURL(file)); // Create preview URL
		}
	};

	return (
		<div className='md:px-12 max-sm:px-5 flex flex-col gap-12 py-24'>
			<h2 className='font-[700] md:text-[32px] max-sm:text-[28px] '>
				Video dərs əlavə et
			</h2>

			<div className='flex flex-col gap-4 w-full'>
				{/* Hidden file input */}
				<input
					type='file'
					accept='image/*'
					className='hidden'
					id='headerFileInput'
					onChange={handleHeaderImageUpload}
				/>

				{/* Clickable div to upload image */}
				<div
					className='flex gap-2 items-center justify-center border-[1px] border-black rounded-full p-3 md:w-[15%] max-sm:w-[60%] cursor-pointer'
					onClick={() => document.getElementById('headerFileInput').click()}>
					<MdOutlinePhotoLibrary />
					<p>Başlıq şəkil əlavə et</p>
				</div>

				{/* Show image preview if an image is uploaded */}
				{headerImage && (
					<div className='flex justify-center mt-2'>
						<img
							src={headerImage}
							alt='Başlıq Şəkil'
							className='w-32 h-32 object-cover rounded-lg'
						/>
					</div>
				)}
			</div>

			<div className='md:w-[60%] max-sm:w-[85%] flex flex-col gap-5'>
				<h3 className='font-[600] text-[20px]'>Başlıq</h3>

				<div>
					<input
						type='text'
						placeholder='Nümunə'
						id=''
						className='border-b-[1px] border-solid border-[#333333] w-[100%]'
					/>
				</div>
			</div>

			<div className='md:w-[60%] max-sm:w-[85%] flex flex-col gap-5'>
				<h3 className='font-[600] text-[20px]'>Description</h3>

				<div>
					<input
						type='text'
						placeholder='Nümunə'
						id=''
						className='border-b-[1px] border-solid border-[#333333] w-[100%]'
					/>
				</div>
			</div>

			<div className='md:w-[75%] max-sm:w-[100%] flex flex-col gap-4'>
				<h3 className='font-[600] text-[20px]'>Dərslər</h3>

				<div className='flex items-center gap-4 w-full'>
					<div className='flex flex-col md:gap-4 max-sm:gap-10 w-full'>
						{items.map((item, index) => (
							<div
								key={item.id}
								className='border-[1px] border-gray-300 rounded-2xl p-4 flex flex-col gap-5 w-full'>
								{/* Hidden file input */}
								<input
									type='file'
									accept='image/*'
									className='hidden'
									id={`fileInput-${index}`}
									onChange={(event) => handleImageUpload(index, event)}
								/>

								<div className='flex justify-between'>
									{/* Clickable div to upload image */}
									<div
										className='flex gap-2 items-center justify-center border-[1px] border-black rounded-full p-2.5 md:w-[15%] max-sm:w-[45%] cursor-pointer'
										onClick={() =>
											document.getElementById(`fileInput-${index}`).click()
										}>
										<MdOutlinePhotoLibrary />
										<p>Şəkil əlavə et</p>
									</div>

									<IoMdClose
										onClick={() => handleLessonDelete(item.id)}
										className='cursor-pointer'
									/>
								</div>
								{/* Show image preview if an image is uploaded */}
								{item.image && (
									<div className='flex justify-center mt-2'>
										<img
											src={item.image}
											alt='Uploaded'
											className='w-32 h-32 object-cover rounded-lg'
										/>
									</div>
								)}

								<div className='flex items-center justify-center gap-5'>
									<div className='flex flex-col gap-5 w-[86%]'>
										<input
											type='text'
											placeholder='Nümunə'
											className='border-b-[1px] border-solid border-[#333333] outline-none p-2'
										/>
										<input
											type='text'
											placeholder='Nümunə'
											className='border-b-[1px] border-solid border-[#333333] outline-none p-2'
										/>
									</div>

									<button className='border-solid border-[1px] border-black rounded-2xl px-6 text-[12px] font-[500] h-8 mt-5'>
										Yapıştır
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* + Button to Add New Div */}
				<div
					className='bg-[#213E82] p-2 rounded-full w-9 h-9 text-white text-[30px] flex self-center cursor-pointer mt-8'
					onClick={addNewDiv}>
					<p className='flex items-center justify-center'>+</p>
				</div>
			</div>
		</div>
	);
}

export default AddLesson;
