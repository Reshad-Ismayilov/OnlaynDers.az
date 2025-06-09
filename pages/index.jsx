// pages/index.jsx
import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/app/AuthLayout";
import { Mail, LockKeyhole } from "lucide-react";
import { FaFacebookSquare, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { API_URL } from "@/app/apiconfig";
import Link from "next/link";

const DMSans = DM_Sans({ subsets: ["latin"] });

function HomePage() {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) router.push("/dashboard");
  }, [router]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required!";
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format!";
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
        setLoading(true);
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          handleLogin(data.accessToken, data.token, "sanan");
          router.push("/dashboard");
        } else {
          setErrors({ email: "Invalid credentials", password: "" });
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Online Dərs - Giriş</title>
        <meta name="description" content="Online dərs platforması" />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Online dərs platformasına xoş gəldiniz!
            </h2>
           
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-transparent'}`}>
              <Mail className="text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            <div className={`flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-transparent'}`}>
              <LockKeyhole className="text-gray-400" />
              <input
                type="password"
                placeholder="Şifrə"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

            <div className="text-right">
              <Link href={"/register"} className="text-sm text-blue-600 hover:underline cursor-pointer">Qeydiyyat</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300 ease-in-out p-5">
              {loading ? "Giriş edilir..." : "Daxil ol"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default HomePage;
