"use client";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Inter } from "next/font/google";
import Link from "next/link";
import api from "@/utils/api"; // Axios instance olmalıdır

const inter = Inter({ subsets: ["latin"] });

const Footer = () => {
  const [siteData, setSiteData] = useState({
    phoneNumber: "",
    email: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socialRes = await api.get("/site/social");
        const phoneRes = await api.get("/site/phone");
        const emailRes = await api.get("/site/email");

        setSiteData({
          phoneNumber: phoneRes.data,
          email: emailRes.data,
          facebook: socialRes.data.facebook,
          instagram: socialRes.data.instagram,
          twitter: socialRes.data.twitter,
          youtube: socialRes.data.youtube,
        });
      } catch (error) {
        console.error("Footer məlumatları yüklənmədi:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`${inter.className} bg-[#3C558F] md:px-20 max-sm:px-0 py-4`}>
      <div className="flex flex-col md:flex-row justify-between p-8 text-white">

        {/* Hədəfimiz */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-[16px] font-[700] mb-4">Hədəfimiz</h3>
          <p className="text-[14px] font-[400] mb-2">Özünü yoxla</p>
          <p className="text-[14px] font-[400] mb-2">İşləyərək öyrən</p>
          <p className="text-[14px] font-[400] mb-2">Yeni hədəflərə çat</p>
        </div>

        {/* Haqqımızda */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-[16px] font-[700] mb-4">Haqqımızda</h3>
          <p>
            <Link href={"/about"} className="text-[14px] font-[400] mb-2">Haqqımızda</Link>
          </p>
          <p>
            <Link href={"/about"} className="text-[14px] font-[400] mb-2">Missiyamız</Link>
          </p>
          <p>
            <Link href={"/about"} className="text-[14px] font-[400] mb-2">Yeniliklər</Link>
          </p>
        </div>

        {/* Əlaqə */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-[16px] font-[700] mb-4">Contact Us</h3>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-white text-2xl mr-2" />
            <span className="text-[14px] font-[400]">{siteData.phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <MdOutlineEmail className="text-white text-2xl mr-2" />
            <span className="text-[14px] font-[400]">{siteData.email}</span>
          </div>
        </div>
      </div>

      {/* Social Media və alt info */}
      <div className="w-[100%] mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-white h-[1px] md:w-[45%] max-sm:w-[35%]"></div>
          <div className="flex gap-5 md:w-[12%] max-sm:w-[50%]">
            {siteData.instagram && (
              <a href={siteData.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/footerImg/Instagram.svg" alt="Instagram" className="w-[100%]" />
              </a>
            )}
            {siteData.facebook && (
              <a href={siteData.facebook} target="_blank" rel="noopener noreferrer">
                <img src="/footerImg/Facebook.svg" alt="Facebook" className="w-[100%]" />
              </a>
            )}
            {siteData.twitter && (
              <a href={siteData.twitter} target="_blank" rel="noopener noreferrer">
                <img src="/footerImg/X.svg" alt="Twitter/X" className="w-[100%]" />
              </a>
            )}
            {siteData.youtube && (
              <a href={siteData.youtube} target="_blank" rel="noopener noreferrer">
                <img src="/footerImg/YouTube.svg" alt="YouTube" className="w-[100%]" />
              </a>
            )}
          </div>
          <div className="bg-white h-[1px] md:w-[45%] max-sm:w-[35%]"></div>
        </div>

        <div className="flex justify-between md:text-[14px] max-sm:text-[12px] text-[#FFFFFF] mt-3">
          <p>2025 All rights reserved</p>
          <div className="flex md:gap-12 max-sm:gap-4">
            <p>Sayt <a href="https://itbtechno.az/" target="_blank" className="text-[#ffc619]" rel="noopener noreferrer">ITB Techno</a> tərəfindən hazırlanmışdır.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
