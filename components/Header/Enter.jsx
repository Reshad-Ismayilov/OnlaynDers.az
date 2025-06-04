import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../login-register/Context";
import Login from "../login-register/Login";
import Register from "../login-register/Register";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Enter() {
  const { openLogin, setOpenLogin } = useContext(LoginContext);
  const { openRegister, setOpenRegister } = useContext(LoginContext);
  const [active, setActive] = useState(null);

  const { t, i18n } = useTranslation("common");
  return (
    <div className="md:flex max-sm:hidden gap-5">
      <button
        onClick={() => setOpenLogin(!openLogin)}
        className="border-2 border-solid rounded-2xl border-[#022270] text-[#022270] px-6 py-1.5"
      >
        {t('login')}
        {openLogin ? <Login /> : ""}
      </button>
      <button
        onClick={() => setOpenRegister(!openRegister)}
        className="bg-[#213E82] text-white px-6 py-2 rounded-2xl"
      >
        {t('register')}
        {openRegister ? <Register /> : ""}
      </button>
      {/* </div> */}
    </div>
  );
}

export default Enter;
