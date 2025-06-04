"use client";
import React, { useEffect, useState } from "react";

// Font Style
import { Inter } from "next/font/google";
import TeacherDashboard from "../../components/dashboard/teacherDashboard/TeacherDashboard";
import CorporateDashboard from "../../components/dashboard/corporateDashboard/CorporateDashboard";
// import CorporateDashboard from './corporateDashboard/CorporateDashboard';

// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import CourseModal from "./CourseModal";

const inter = Inter({ subsets: ["latin"] });

export default function CoruselAdminContent() {
  const [lessons, setLessons] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const getUserInfo = async () => {
    api
      .get("auth/me")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Dərsləri gətir
  const getLessons = async () => {
    try {
      
      const response = await api.get("/course/getall/az")
      setLessons(response.data);
    } catch (error) {
      console.error("Dərslər alınarkən xəta baş verdi:", error);
    }
  };

  useEffect(() => {
    getUserInfo();

    getLessons();
  }, [router]);

  const [index, setIndex] = useState(0);
  const itemsPerPage = 3; // Number of items visible
  const totalSlides = lessons.length - itemsPerPage; // Maximum slides before stopping

  // Move to the next set of items
  const nextSlide = () => {
    if (index < totalSlides) {
      setIndex(index + 1);
    }
  };

  // Move to the previous set of items
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const responsive = {
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2, // Show 1 item at a time on mobile
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2, // Show 2 items at a time on tablet
    },
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 3, // Show 3 items at a time on large screens
    },
  };

  const responsiveLesson = {
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 3,
    },
  };

  return (
    <main className="md:w-[100%] sm:w-[100%] max-sm:w-[100%] max-sm:mx-auto sm:mx-auto flex md:flex-col sm:flex-col-reverse max-sm:flex-col-reverse gap-10">
      <div className="flex sm:flex-col max-sm:flex-col gap-7">
        {/* Mobile */}
        <div className="w-full md:hidden">
          <Carousel
            responsive={responsive}
            autoPlay={false} // No auto scroll
            draggable={true} // Enable dragging
            swipeable={true} // Enable swiping on mobile
            infinite={false} // Stop at last slide
            // showDots={true} // Show dots on mobile
            arrows={false} // Hide default arrows
            // containerClass='py-4'
          >
            {lessons?.map((d) => (
              <div
                key={d.id}
                className="flex justify-center items-center gap-5 bg-white py-3 rounded-3xl shadow-md ms-4"
              >
                <div className="flex justify-center items-center gap-2">
                  <div className="bg-[#BAC3D8] rounded-full flex justify-center items-center p-2.5">
                    <img src={d.image} alt={d.course} />
                  </div>
                  <div>
                    <p className="font-[600] text-[12px] text-[#8E8B8B]">
                      {d.seen}/{d.lessonCount} baxıldı
                    </p>
                    <h3 className="font-[600] text-[16px]">{d.course}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Header with Navigation */}
        <div className="flex items-center justify-between">
          <h3 className="font-[600] text-[20px]">Baxmağa davam edin</h3>
          <div className="md:flex gap-4 sm:hidden max-sm:hidden">
            <img
              src="/dashboardImg/leftArr.svg"
              alt="Previous"
              className="w-[70%] cursor-pointer"
              onClick={prevSlide}
            />
            <img
              src="/dashboardImg/rightArr.svg"
              alt="Next"
              className="w-[70%] cursor-pointer"
              onClick={nextSlide}
            />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="bg-white overflow-hidden p-6 rounded-3xl md:block sm:hidden max-sm:hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / itemsPerPage)}%)`,
            }}
          >
            {lessons.map((les) => (
              <div
                onClick={() => setSelectedCourse(les)}
                key={les.id}
                className="flex flex-col gap-3 min-w-[32%]"
              >
                <img
                  src={les.attachmentUrl}
                  alt={les.title}
                  className="rounded-3xl w-full"
                />
                <h3 className="font-[700] text-[12px]">{les.title}</h3>
                <p className="font-[400] text-[12px]">{les.info}</p>
              </div>
            ))}
         
          </div>
        </div>

        {/* Modal */}
        {selectedCourse && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedCourse(null)} // Modalın xaricində klikləyərək bağlaya biləcəksiniz
          >
            <div
              className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()} // Modalın içindəki klikləri qarşısını alır
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {selectedCourse.title} üçün məlumat
              </h2>
              <p>{selectedCourse.info}</p>
            </div>
            {selectedCourse && (
              <CourseModal
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
              />
            )}
          </div>
        )}

        {/* Mobile */}
        <div className="bg-white overflow-hidden p-6 rounded-3xl md:hidden">
          <Carousel
            responsive={responsiveLesson}
            autoPlay={false}
            draggable={true}
            swipeable={true}
            infinite={false}
            arrows={false}
            containerClass="py-4"
          >
            {lessons.map((les) => (
              <div key={les.id} className="flex flex-col gap-3 min-w-[32%]">
                <img
                  src={les.attachmentUrl}
                  alt={les.attachmentUrl}
                  className="rounded-3xl w-full"
                />
                <h3 className="font-bold text-sm">{les.title}</h3>
                <p className="font-normal text-sm">{les.info}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </main>
  );
}
