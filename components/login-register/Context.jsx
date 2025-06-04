'use client';

import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

function Context({ children }) {
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	return (
		<LoginContext.Provider
			value={{ openLogin, setOpenLogin, openRegister, setOpenRegister }}>
			{children}
		</LoginContext.Provider>
	);
}

export default Context;
