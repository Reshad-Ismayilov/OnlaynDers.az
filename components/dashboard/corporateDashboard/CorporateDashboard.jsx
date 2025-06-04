"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/app/apiconfig";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";

function TeacherDashboard({ userInfo }) {
  const [students, setStudents] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleAddUser = async () => {
    if (!email) {
      setMessage("Zəhmət olmasa email daxil edin.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/users/${userInfo.id}/add-employee`, {
        email: email,
      });
      setMessage("İşçi uğurla əlavə olundu!");
      setEmail("");
      getStudents(); // Siyahını yenilə
    } catch (error) {
      if (error.response) {
        const message =
          error.response.data?.message || "Xəta baş verdi (server).";
        setMessage(message);
      } else if (error.request) {
        setMessage("Server cavab vermədi.");
      } else {
        setMessage("Xəta baş verdi: " + error.message);
      }
    }

    setLoading(false);
  };

  const handleRemoveUser = async (studentEmail) => {
    const confirmed = window.confirm("İstifadəçini silmək istədiyinizə əminsiniz?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await api.post(`/users/${userInfo.id}/remove-employee`, {
        email: studentEmail,
      });
      setMessage("İşçi uğurla silindi!");
      getStudents(); // Siyahını yenilə
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message || "Xəta baş verdi (server).";
        setMessage(message);
      } else if (error.request) {
        setMessage("Server cavab vermədi.");
      } else {
        setMessage("Xəta baş verdi: " + error.message);
      }
    }

    setLoading(false);
  };

  const getStudents = async () => {
    const response = await api.get("users/employees");
    setStudents(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <aside className="md:w-[25%] sm:w-[95%] max-sm:w-[95%] sm:mx-auto max-sm:mx-auto h-[100%] flex flex-col md:gap-22 sm:gap-10 max-sm:gap-10 md:bg-white sm:bg-[#F1ECEC] max-sm:bg-[#F1ECEC] md:p-4 sm:p-0 max-sm:p-0 rounded-3xl mb-12">
      <div className="flex flex-col gap-8">
        <div className="w-[100%] flex flex-col items-center justify-center gap-4">
          <h3 className="font-[500] text-[18px]">
            {userInfo?.firstName} {userInfo?.lastName}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-white sm:p-4 max-sm:p-4 rounded-3xl">
        <div className="flex justify-between items-center">
          <h2 className="font-[400] text-[18px]">Sənin Hesabların</h2>
          <button
            className="border-[1px] border-solid border-gray-400 px-[9px] rounded-full text-[20px]"
            onClick={() => setShowModal(true)}
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-5 bg-[#E9ECF3] rounded-3xl px-4 py-7 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#213E82] scrollbar-track-[#FFFFFF] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {students.map((student) => (
            <div key={student.id} className="flex gap-3 justify-between items-center">
              <div className="flex gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}?background=0D8ABC&color=fff`}
                  alt={student.firstName}
                  className="w-[22%]"
                />
                <div className="flex flex-col">
                  <p className="font-[400] text-[14px]">
                    {student.firstName} {student.lastName}
                  </p>
                </div>
              </div>
              <button
                className="text-red-600 text-sm border px-2 py-1 rounded hover:bg-red-100"
                onClick={() => handleRemoveUser(student.email)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl mb-4">Yeni işçi əlavə et</h2>
            <input
              type="email"
              placeholder="İşçinin email-i"
              className="border border-gray-400 px-3 py-2 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {message && <p className="text-red-500 mt-2">{message}</p>}

            <div className="flex justify-between">
              <div>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3"
                  disabled={loading}
                >
                  {loading ? "Gözləyin..." : "Əlavə et"}
                </button>
              </div>
              <button
                className="mt-4 text-red-500"
                onClick={() => setShowModal(false)}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default TeacherDashboard;
