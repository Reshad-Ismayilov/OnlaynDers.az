"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";

const inter = Inter({ subsets: ["latin"] });

export default function CoruselCompanyUserContent() {
  const [lessons, setLessons] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me");
      setUser(response.data);
      console.log(response.data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLessons = async () => {
    try {
      const response = await api.get("companies/user/courses");
      setLessons(response.data);
      console.log(response.data);
      
    } catch (err) {
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    getLessons();
  }, [router]);

  return (
    <main className="w-full my-5 flex flex-col gap-10 p-4 md:p-8 bg-gradient-to-b from-[#f7f9fc] to-[#ffffff]">
      
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Baxmağa davam edin</h2>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/videoResources/${lesson.id}/az`}
            className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform p-4"
          >
            <img
              src={lesson.attachmentUrl}
              alt={lesson.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{lesson.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{lesson.info}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
