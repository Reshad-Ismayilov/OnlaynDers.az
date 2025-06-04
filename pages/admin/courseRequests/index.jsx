"use client";

import api from "@/utils/api";
import { useState, useEffect } from "react";

const PAGE_SIZE = 5;

const CourseRequests = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/course-requests");
      setData(res.data);
      setFilteredData(res.data);
    } catch {
      setError("Məlumat gətirilərkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredData(data);
    } else {
      const lowerFilter = filterText.toLowerCase();
      const filtered = data.filter((item) => {
        const fullName = `${item.user.firstName} ${item.user.lastName}`.toLowerCase();
        const email = item.user.email.toLowerCase();
        return fullName.includes(lowerFilter) || email.includes(lowerFilter);
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [filterText, data]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = filteredData.slice(startIndex, startIndex + PAGE_SIZE);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 text-red-800 rounded shadow">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Course Requests</h1>

      <div className="mb-6 max-w-sm">
        <label htmlFor="search" className="sr-only">
          Axtarış
        </label>
        <div className="relative text-gray-600 focus-within:text-gray-900">
          <input
            id="search"
            type="search"
            placeholder="İstifadəçi adı və ya email üzrə axtar..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
          />
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.6-10.6 7.5 7.5 0 01-10.6 10.6z" />
            </svg>
          </span>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 mt-12 text-lg">Məlumat tapılmadı</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price (AZN)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.course.attachmentUrl}
                        alt={`Course ${item.course.id}`}
                        className="h-16 w-28 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.course.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.course.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {item.course.category?.id ?? "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {item.user.firstName} {item.user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">
                      {item.user.email}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap font-semibold ${
                        item.user.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.user.active ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition ${
                currentPage === 1
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </button>

            <span className="text-gray-700 font-medium">
              Səhifə {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition ${
                currentPage === totalPages
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <span>Next</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseRequests;
