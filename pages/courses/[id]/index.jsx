"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import api from "@/utils/api";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    const currentLang = i18n.language || "az";

    if (id) {
      // Kurs detalları
      api
        .get(`/course/detail/get/${id}/${currentLang}`)
        .then((res) => setCourse(res.data))
        .catch((err) => console.error("Error fetching course:", err));

      // Dərslər
      api
        .get(`/lesson/lesson/detail/${id}/${currentLang}`)
        .then((res) => setLessons(res.data))
        .catch((err) => console.error("Error fetching lessons:", err));
    }
  }, [id, i18n.language]);

  if (!course) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-600">
        Yüklənir...
      </div>
    );
  }

  // Müraciət funksiyası
  const handleApplyClick = async () => {
    setLoading(true);
    setApplyError(null);

    try {
      // Login yoxlama
      await api.get("auth/me");

      // Müraciəti göndər
      await api.post("/course-requests/apply", {
        courseId: course.id,
      });

      // Uğurlu modal və login səhifəsinə yönləndirmə
      await Swal.fire({
        icon: "success",
        title: "Uğur",
        text: "Müraciətiniz uğurla göndərildi!",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Login yoxdursa xəbərdarlıq modalı və yönləndirmə
        await Swal.fire({
          icon: "warning",
          title: "Xəbərdarlıq",
          text: "Zəhmət olmasa əvvəlcə daxil olun.",
          confirmButtonText: "Giriş səhifəsinə get",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

      } else {
        setApplyError("Müraciət göndərilərkən xəta baş verdi.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Salestar - {course.title}</title>
        <meta name="description" content="Sizin sayt təsviri" />
      </Head>

      <div
        className={`${inter.className} bg-[#F1F3F6] min-h-screen py-12 px-4 sm:px-8 lg:px-24`}
      >
        <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-10">
          {/* Başlıq və Apply düyməsi */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              {course.title}
            </h1>
            <button
              onClick={handleApplyClick}
              disabled={loading}
              className="bg-[rgb(60,85,143)] text-white text-sm sm:text-base font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Göndərilir..." : t("apply") || "Tətbiq Et"}
            </button>
          </div>

          {/* Xəta mesajı */}
          {applyError && (
            <div className="text-red-600 font-semibold">{applyError}</div>
          )}

          {/* Şəkil və təsvir */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-[250px] sm:h-[350px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={course.attachmentUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 text-gray-700 text-base leading-relaxed">
              {course.description}
            </div>
          </div>

          {/* Dərslər */}
          <div className="space-y-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-50 rounded-xl p-5 shadow-sm transition-transform hover:scale-[1.01]"
              >
                <div className="relative sm:w-[150px] w-full rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="/courseInfoImg/black.png"
                    alt={lesson.title}
                    className="w-full"
                  />
                  <img
                    src="/courseInfoImg/Lock.svg"
                    alt="lock icon"
                    className="absolute top-[35%] left-[40%]"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {lesson.info ||
                      "Bu dərs haqqında ətraflı məlumat tezliklə əlavə olunacaq."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
