import React, { useState, useEffect } from "react";
import api from "@/utils/api";

const CourseModal = ({ course, onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [nonEmployees, setNonEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (course) {
      fetchEmployees();
      fetchSelectedEmployees();
    }
  }, [course]);



  const fetchEmployees = async () => {
    try {
      const response = await api.get(
        `user-course/users/${course.id}/employees`
      );
      setEmployees(response.data);
    } catch (err) {
      setError("Xəta baş verdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedEmployees = async () => {
    try {
      const response = await api.get(
        `user-course/users/${course.id}/non/employees`
      );
      setNonEmployees(response.data);
    } catch (err) {
      setError("Xəta baş verdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const assignEmployee = async (userEmail) => {
    try {
      await api.post("/admin/courses/assign", {
        courseId: course.id,
        userEmail,
      });
      alert("Əməkdaş uğurla kursa təyin edildi!");
    } catch (err) {
      alert("Təyin edərkən xəta baş verdi: " + err.message);
    }
  };

  const removeEmployee = async (userId) => {
    try {
      await api.post("/admin/courses/remove", {
        courseId: course.id,
        userId: userId,
      });
      alert("Əməkdaş uğurla kursdan silindi!");
    } catch (err) {
      alert("Silinmə edərkən xəta baş verdi: " + err.message);
    }
  };

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Modalın üstündə hər hansı yerə tıkladıqda bağlanacaq
    >
      <div
        className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Modalın içində klikləməyi qarşısını alır
      >
        {/* Bağlama düyməsi */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {course.title} üçün əməkdaş seç
        </h2>

        {loading ? (
          <p className="text-center mt-4">Yüklənir...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-4">{error}</p>
        ) : (
          <>
            <ul className="mt-6 space-y-3">
              {employees.map((emp) => (
                <li
                  key={emp.id}
                  className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
                >
                  <span className="text-gray-700">
                    {emp.firstName} {emp.lastName} ({emp.email})
                  </span>
                  <button
                    onClick={() => assignEmployee(emp.email)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              {nonEmployees.map((emp) => (
                <li
                  key={emp.id}
                  className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
                >
                  <span className="text-gray-700">
                    {emp.firstName} {emp.lastName} ({emp.email})
                  </span>
                  <button
                    onClick={() => removeEmployee(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
