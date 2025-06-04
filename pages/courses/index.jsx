"use client";
import React, { useEffect, useState } from "react";

// Font Style
import { Inter } from "next/font/google";
import Link from "next/link";
import { API_URL } from "@/app/apiconfig";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

function Index() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t, i18n } = useTranslation("common");

  // Kursları yükləyən funksiya, categoryId parametri ilə
  const getCourses = async (lang, categoryId = null) => {
    try {
      let url = `${API_URL}/course/getall/${lang}`;
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Kursları yükləmək alınmadı:", error);
    }
  };

  // Kateqoriyaları yükləyən funksiya
  const getCategories = async (lang) => {
    try {
      const res = await fetch(`${API_URL}/category/getall/${lang}`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Kateqoriyaları yükləmək alınmadı:", error);
    }
  };

  // Dil dəyişəndə və ya kateqoriya dəyişəndə kursları yenilə
  useEffect(() => {
    const currentLang = i18n.language || "az";
    getCategories(currentLang);
    getCourses(currentLang, selectedCategory);
  }, [i18n.language, selectedCategory]);

  // Kateqoriya seçimi dəyişdikdə seçimi state-ə yazırıq
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val === "all" ? null : Number(val));
  };

  return (
    <>
      <Head>
        <title>Salestar - Kurslar</title>
        <meta name="description" content="Sizin sayt təsviri" />
      </Head>

      <div
        className={`${inter.className} md:bg-[#F1ECEC] max-sm:bg-white md:px-12 max-sm:px-2 py-20`}
      >
        {/* Kateqoriya seçim dropdown */}
        <div className="mb-6">
          <label className="mr-4 font-semibold">Kateqoriya seç:</label>
          <select
            value={selectedCategory === null ? "all" : selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="all">Hamısı</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-2xl md:p-10 max-sm:p-2 flex flex-col gap-7">
          {courses.length === 0 ? (
            <p>Kurs tapılmadı.</p>
          ) : (
            courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div
                  className="bg-[#F1ECEC] rounded-xl flex items-center justify-around md:px-16 max-sm:px-1 max-sm:py-4 cursor-pointer"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={course.attachmentUrl}
                      alt={course.title}
                      className="md:w-[27%] max-sm:w-[45%] md:p-7 sm:p-3 max-sm:p-3"
                    />

                    <div className="md:w-[60%] max-sm:w-[100%] flex flex-col gap-3">
                      <h2 className="font-[700] text-[20px]">{course.title}</h2>
                      <p className="font-[500] text-[16px] text-[#8D8989]">
                        {course.info}
                      </p>
                    </div>
                  </div>

                  <img
                    src="/coursesImg/rightArr.svg"
                    alt=""
                    className="max-sm:hidden md:w-[4%]"
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
