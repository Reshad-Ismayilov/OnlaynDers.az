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
import CoruselAdminContent from "@/components/courses/CoruselAdminContent";
import CoruselUserContent from "@/components/courses/CoruselUserContent";
import UserStatisticsTable from "@/components/statistics/UserStatisticsTable";
import CoruselCompanyUserContent from "@/components/courses/CoruselCompanyUserContent";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const [lessons, setLessons] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me");
      setUser(response.data);
    } catch (err) {
      if (err.response) {
        // Handle JSON error responses
        if (err.response.data && typeof err.response.data === "object") {
          setError(err.response.data.error || err.message);
        } else {
          // Handle non-JSON responses
          try {
            const errorData = JSON.parse(err.response.data);
            setError(errorData.error || err.message);
          } catch (parseError) {
            setError(err.response.data || err.message);
          }
        }

        if (err.response.status === 401) {
          window.location.href = "/"; // Redirect to login page
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Dərsləri gətir
  const getLessons = async () => {
    try {
      const response = await api.get("/course/getall/az"); // Use your axios instance
      setLessons(response.data);
    } catch (error) {
      console.error("Dərslər alınarkən xəta baş verdi:", error);
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    getUserInfo();

    getLessons();
  }, [router, redirecting]);

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
    <>
      <Head>
        <title>Salestar - Dashboard</title>
        <meta name="description" content="Sizin sayt təsviri" />
      </Head>

      <div
        className={`${inter.className} md:px-12 sm:px-3 max-sm:px-3  pt-24 bg-[#F1ECEC] flex md:flex-row sm:flex-col-reverse max-sm:flex-col-reverse gap-10`}
      >
        <main className="md:w-[70%] sm:w-[100%] max-sm:w-[100%] max-sm:mx-auto sm:mx-auto flex md:flex-col sm:flex-col-reverse max-sm:flex-col-reverse gap-10">
          {user?.roleName === "company" && (
            <>
              <CoruselAdminContent userInfo={user} />
              <UserStatisticsTable />
            </>
          )}

          {user?.roleName === "company_user" && (
            <>
              <CoruselCompanyUserContent />
            </>
          )}

          {user?.roleName === "user" && (
            <>
              <CoruselUserContent />
            </>
          )}
        </main>

        {/* <TeacherDashboard /> */}

        {user?.roleName == "company" ? (
          <CorporateDashboard userInfo={user} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
