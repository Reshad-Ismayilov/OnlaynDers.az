"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/app/apiconfig";

function TextSearch({ currentLanguage = "az" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search when query changes (after 3 characters)
  useEffect(() => {
    if (query.length >= 3) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        fetchResults();
      }, 300); // Debounce 300ms

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(
          query
        )}&langCode=${currentLanguage}`
      );
      const data = await response.json();
      setResults(data.results); // <== DƏYİŞDİ
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      router.push(
        `${API_URL}/course/${currentLanguage}/search?q=${encodeURIComponent(
          query
        )}`
      );
      setShowDropdown(false);
    }
  };

  const handleCourseSelect = (courseId) => {
    router.push(
      `${API_URL}/course/${currentLanguage}/courses/${courseId}`
    );
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-center p-2 rounded-2xl shadow-md bg-gray-100 border-gray-200 border-[3px]"
      >
        <input
          type="text"
          placeholder={
            currentLanguage === "az" ? "Kurslar və s." : "Курсы и т.д."
          }
          className="flex-grow bg-transparent px-4 py-2 outline-none text-gray-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
        />
        <button
          className="bg-blue-900 text-white px-8 mr-10 py-2 rounded-xl text-[16px] font-[400]"
          type="submit"
        >
          {currentLanguage === "az" ? "Axtar" : "Поиск"}
        </button>
      </form>

      {showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <ul className="py-1">
            {results.map((course) => (
              <Link href={"/courses/"+course.courseId}>
                <li
                  key={course.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {course.description.substring(0, 60)}...
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextSearch;
