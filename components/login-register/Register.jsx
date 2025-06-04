"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { DM_Sans } from "next/font/google";
const DMSans = DM_Sans({ subsets: ["latin"] });

import Swal from "sweetalert2";
import { X, Mail, User, Eye, EyeOff, Phone } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { API_URL } from "@/app/apiconfig";

export default function Register() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
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
      newErrors.email = "Email is required!";
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format!";
      valid = false;
    }

    if (!firstName) {
      newErrors.firstName = "First name is required!";
      valid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required!";
      valid = false;
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required!";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required!";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
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
          const data = await response.json();

          Swal.fire({
            title: "Qeydiyyat uğurludur!",
            text: "Tezliklə sizin mobil nömrənizlə əlaqə saxlanacaq.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            location.reload();
          });
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setMessage("Qeydiyyat zamanı xəta baş verdi.");
      }
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className={`${DMSans.className} relative`}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-400/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col gap-7 sm:items-start">
                <div className="w-full flex justify-between">
                  <img src="/navImg/nav-img.svg" alt="logo" className="w-[10%]" />
                  <X className="w-[3.5%] cursor-pointer" onClick={() => setOpen(false)} />
                </div>

                <div className="px-3 flex flex-col gap-6">
                  <p className="text-[16px] text-[#1B1B1B99]">
                    Join us and get more benefits. We promise to keep your data safely.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {/* First Name */}
                    <div
                      className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${
                        errors.firstName ? "border-red-500" : "border-transparent"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-[#E9ECF3] outline-none w-full"
                      />
                      <User />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                    {/* Last Name */}
                    <div
                      className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${
                        errors.lastName ? "border-red-500" : "border-transparent"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-[#E9ECF3] outline-none w-full"
                      />
                      <User />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                    {/* Email */}
                    <div
                      className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${
                        errors.email ? "border-red-500" : "border-transparent"
                      }`}
                    >
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#E9ECF3] outline-none w-full"
                      />
                      <Mail />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    {/* Phone Number */}
                    <div
                      className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${
                        errors.phoneNumber ? "border-red-500" : "border-transparent"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-[#E9ECF3] outline-none w-full"
                      />
                      <Phone />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                    )}

                    {/* Password */}
                    <div
                      className={`bg-[#E9ECF3] p-3 flex justify-between rounded-md border-2 ${
                        errors.password ? "border-red-500" : "border-transparent"
                      }`}
                    >
                      <input
                        type={showPwd ? "text" : "password"}
                        placeholder="Password"
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
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-[#3DCBB1] text-white p-2.5 text-center rounded-2xl mt-2"
                    >
                      Register
                    </button>

                    {message && (
                      <p className="text-center text-sm mt-2 text-red-600">{message}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
