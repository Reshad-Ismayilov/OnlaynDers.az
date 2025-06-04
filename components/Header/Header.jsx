"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { LoginContext } from "../login-register/Context";
import Link from "next/link";
import "@/app/globals.css";
import Enter from "./Enter";
import Logout from "./Logout";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiX } from "react-icons/fi";
import Login from "../login-register/Login";
import Register from "../login-register/Register";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  const { setOpenLogin, setOpenRegister } = useContext(LoginContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation('common');
  const { isAuthenticated, accessToken } = useAuth();

  const changeLanguage = (lng) => {
    i18nInstance.changeLanguage(lng);
    // You might want to save the language preference to localStorage
    localStorage.setItem('i18nextLng', lng);
  };

  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setUser(response.data);
    } catch (err) {
      setError("Token error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) getUserInfo();
  }, [accessToken]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`${inter.className} w-full bg-white shadow-md`}>
      <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 rounded-b-2xl md:px-14 max-sm:px-3">
        <Link href={"/"}>
          <img src="/navImg/nav-img.svg" alt="Logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="max-sm:hidden md:block">
          <ul className="flex space-x-12 font-[600] text-[16px]">
            <Link href="/" className={`cursor-pointer transition-colors ${pathname === "/" ? "text-red-400" : ""}`}>
              {t('home')}
            </Link>
            <Link href="/courses" className={`cursor-pointer transition-colors ${pathname === "/courses" ? "text-red-400" : ""}`}>
              {t('courses')}
            </Link>
            <Link href="/about" className={`cursor-pointer transition-colors ${pathname === "/about" ? "text-red-400" : ""}`}>
              {t('about')}
            </Link>
          </ul>
        </div>
        {/* Mobile Right */}
        <div className="max-sm:flex md:hidden items-center justify-end space-x-4">
          <IoIosSearch size={20} />

          {!loading && isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <img
                src="/navImg/teacher.png"
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">
                {user?.firstName} {user?.lastName} {user?.roleName} 
              </span>
            </div>
          ) : (
            <button onClick={() => setOpenLogin(true)}>
              <BiUser size={22} />
            </button>
          )}

          <button onClick={toggleSidebar}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
        {/* Desktop Right */}
        <div className="md:flex max-sm:hidden items-center space-x-4">
          {!loading && isAuthenticated ? (
            <Logout />
          ) : (
            <Enter />
          )}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Optional: Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-[70%] bg-white z-50 shadow-lg p-4">
          <div className="flex justify-end">
            <button onClick={closeSidebar}>
              <FiX size={24} />
            </button>
          </div>
          <ul className="flex flex-col mt-6 space-y-4 font-semibold">
            <Link href="/" onClick={closeSidebar}>{t('home')}</Link>
            <Link href="/courses" onClick={closeSidebar}>{t('courses')}</Link>
            <Link href="/about" onClick={closeSidebar}>{t('about')}</Link>
            {!loading && isAuthenticated ? (
              <Logout />
            ) : (
              <button
                className="text-left"
                onClick={() => {
                  setOpenLogin(true);
                  closeSidebar();
                }}
              >
                {t('login')}
              </button>
            )}
            {/* <LanguageSwitcher /> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;