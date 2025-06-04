"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { useTranslation } from "react-i18next";

function Login({ userInfo }) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated, logout, accessToken } = useAuth();

  const getUserInfo = async () => {
    try {
      api
        .get("auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("authState");
          router.push("/");
          setError(err.message);
          setLoading(false);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getUserInfo();
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenUserMenu(false);
        setOpenNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setOpenUserMenu(false);
    setOpenNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authState");

    router.push("/");
    router.refresh();
  };

  return (
    <div className="md:flex max-sm:hidden">
      <div className="relative w-[100%] z-50">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {openNotifications && (
              <div
                ref={notificationRef}
                className="absolute right-0 mt-2 w-64 bg-blue-100 shadow-lg rounded-lg p-3 z-50"
              >
                <h4 className="font-semibold text-lg mb-2">Notification</h4>
                <ul className="space-y-2">
                  {notifications.map((notif) => (
                    <li className="flex items-center space-x-2 p-2 border-b">
                      <span className="text-blue-600">•</span>
                      <p>{notif.notif}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            <div
              onClick={() => {
                setOpenUserMenu(!openUserMenu);
                setOpenNotifications(false);
              }}
            >
              <p className="text-[14px] text-gray-500">
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <Link href={"/dashboard"}>
              <div>
                <p className="text-[14px] text-gray-500">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
              </div>
            </Link>

            <IoIosArrowDown
              className={`cursor-pointer transition-transform ${
                openUserMenu ? "rotate-180" : ""
              }`}
              onClick={() => {
                setOpenUserMenu(!openUserMenu);
                setOpenNotifications(false);
              }}
            />
          </div>
        </div>

        {openUserMenu && (
          <div
            ref={userMenuRef}
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-60"
          >
            {user?.roleName == "user" && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_courses")}
                </Link>
              </>
            )}
            {user?.roleName == "admin" && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("courses")}
                </Link>
                <Link
                  href="/admin/category"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("categories")}
                </Link>
                <Link
                  href="/admin/companies"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_companies")}
                </Link>
                                <Link
                  href="/admin/courseRequests"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("course_request")}
                </Link>
                <Link
                  href="/admin/banner"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_banner")}
                </Link>
                <Link
                  href="/admin/innovation"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_innovation")}
                </Link>
                <Link
                  href="/admin/mission"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_mission")}
                </Link>
                <Link
                  href="/admin/siteInfo"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("site_info")}
                </Link>
                <Link
                  href="/admin/partner"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_partner")}
                </Link>
                <Link
                  href="/admin/statistic"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_statistic")}
                </Link>
                <Link
                  href="/admin/about"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("about")}
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_users")}
                </Link>
                <Link
                  href="/admin/quiz"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiSettings className="mr-2" />
                  {t("admin_quiz")}
                </Link>
              </>
            )}
            <Link
              href="/dashboard"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiSettings className="mr-2" />
              {t("admin_courses")}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-[90%] p-2 text-red-500 hover:bg-gray-100 rounded-lg"
            >
              <FiLogOut className="mr-2" />
              {t("logout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
