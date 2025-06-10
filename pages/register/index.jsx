"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { DM_Sans } from "next/font/google";
const DMSans = DM_Sans({ subsets: ["latin"] });

import Swal from "sweetalert2";
import { Mail, User, Eye, EyeOff, Phone } from "lucide-react";
import { API_URL } from "@/app/apiconfig";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Azərbaycan telefon nömrəsi validasiyası
  const isValidAzerbaijanPhoneNumber = (number) => /^\+994\d{9}$/.test(number);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
    };

    if (!email) {
      newErrors.email = "Email tələb olunur!";
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Yanlış email formatı!";
      valid = false;
    }

    if (!firstName) {
      newErrors.firstName = "Ad tələb olunur!";
      valid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Soyad tələb olunur!";
      valid = false;
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Telefon nömrəsi tələb olunur!";
      valid = false;
    } else if (!isValidAzerbaijanPhoneNumber(phoneNumber)) { // Yeni validasiya əlavəsi
        newErrors.phoneNumber = "Telefon nömrəsi +994XXXXXXXXX formatında olmalıdır!";
        valid = false;
    }

    if (!password) {
      newErrors.password = "Şifrə tələb olunur!";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Şifrə ən azı 6 simvol olmalıdır!";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Qeydiyyat uğurludur!",
            text: "Tezliklə sizin mobil nömrənizlə əlaqə saxlanacaq.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.push("/");
          });
        } else {
          throw new Error("Qeydiyyat alınmadı.");
        }
      } catch (error) {
        console.error("Qeydiyyat xətası:", error);
        setMessage("Qeydiyyat zamanı xəta baş verdi.");
      }
    }
  };

  return (
    <div className={`${DMSans.className} flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4`}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ad */}
          <div className={`p-3 flex justify-between rounded-md border-2 bg-[#E9ECF3] ${errors.firstName ? "border-red-500" : "border-transparent"}`}>
            <input
              type="text"
              placeholder="Ad"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#E9ECF3] outline-none w-full"
            />
            <User />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

          {/* Soyad */}
          <div className={`p-3 flex justify-between rounded-md border-2 bg-[#E9ECF3] ${errors.lastName ? "border-red-500" : "border-transparent"}`}>
            <input
              type="text"
              placeholder="Soyad"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#E9ECF3] outline-none w-full"
            />
            <User />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

          {/* Email */}
          <div className={`p-3 flex justify-between rounded-md border-2 bg-[#E9ECF3] ${errors.email ? "border-red-500" : "border-transparent"}`}>
            <input
              type="email"
              placeholder="Email Ünvanı"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#E9ECF3] outline-none w-full"
            />
            <Mail />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Telefon Nömrəsi */}
          <div className={`p-3 flex justify-between rounded-md border-2 bg-[#E9ECF3] ${errors.phoneNumber ? "border-red-500" : "border-transparent"}`}>
            <input
              type="text"
              placeholder="Telefon Nömrəsi (+994XXXXXXXXX)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-[#E9ECF3] outline-none w-full"
            />
            <Phone />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

          {/* Şifrə */}
          <div className={`p-3 flex justify-between rounded-md border-2 bg-[#E9ECF3] ${errors.password ? "border-red-500" : "border-transparent"}`}>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#E9ECF3] outline-none w-full"
            />
            {showPwd ? (
              <EyeOff onClick={() => setShowPwd(!showPwd)} className="cursor-pointer" />
            ) : (
              <Eye onClick={() => setShowPwd(!showPwd)} className="cursor-pointer" />
            )}
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button type="submit" className="bg-[#3DCBB1] text-white p-3 rounded-2xl mt-4 font-semibold hover:bg-[#35b2a4] transition">
            Qeydiyyatdan Keç
          </button>

          {message && <p className="text-center text-red-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}