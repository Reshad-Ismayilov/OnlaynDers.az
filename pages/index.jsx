"use client"
import Head from "next/head"
import { DM_Sans } from "next/font/google"
import { useTranslation } from "react-i18next"
import AuthLayout from "@/app/AuthLayout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"
import { API_URL } from "@/app/apiconfig"
import Link from "next/link"
import { IoLogoWhatsapp } from "react-icons/io"
import { FaSquareInstagram } from "react-icons/fa6"
import { BsLinkedin } from "react-icons/bs"
import { FaFacebookSquare, FaRegPlayCircle } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa6"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { PiCertificate } from "react-icons/pi"
import { PiExamLight } from "react-icons/pi"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Menu, X } from "lucide-react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";









const DMSans = DM_Sans({ subsets: ["latin"] })

function HomePage() {
  const { t } = useTranslation("common")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const { handleLogin } = useAuth()

  // Contact form state
  const [contactFormData, setContactFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    mesaj: "",
  })

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) router.push("/dashboard")
  }, [router])

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let valid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required!"
      valid = false
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format!"
      valid = false
    }

    if (!password) {
      newErrors.password = "Password is required!"
      valid = false
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!"
      valid = false
    }


    setErrors(newErrors)

    if (valid) {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        if (response.ok) {
          handleLogin(data.accessToken, data.token, "sanan")
          router.push("/dashboard")
        } else {
          setErrors({ email: "Invalid credentials", password: "" })
        }
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  // Contact form handler
  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log("Form məlumatları:", contactFormData)
    // Burada form məlumatlarını göndərmək üçün API çağırışı edə bilərsiniz
  }


  return (
    <>

      <Head>
        <title>Online Dərs - Girişə</title>
        <meta name="description" content="Online dərs platforması" />
      </Head>

      <div className="buter">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 bg-white shadow-sm relative">
            {/* Logo */}
            <div className="flex items-center justify-start gap-6">

              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="bg-blue-500 rounded-sm"></div>
                <div className="bg-red-500 rounded-sm"></div>
                <div className="bg-yellow-500 rounded-sm"></div>
                <div className="bg-green-500 rounded-sm"></div>
              </div>
               <span className="block md:hidden font-semibold text-base text-black">Onlaynders.az</span>

              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
                <Link href="/">{t("Ana səhifə")}</Link>
                <Link href="/about">{t("Haqqımızda")}</Link>
                <Link href="/courses">{t("Dərslər")}</Link>
                <Link href="/trainer">{t("Təlimçi")}</Link>
                <Link href="/contact">{t("Əlaqə")}</Link>
              </nav>
            </div>



            <button
              className="hidden md:block hover:text-white px-8 py-2 rounded-full font-medium text-white"
              style={{
                background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
              }}
            >
              Kurs al
            </button>


            {/* hamburger iconu */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobil menyuu hissə */}

          {menuOpen && (
            <div className="md:hidden bg-white shadow-md rounded px-4 py-4 space-y-3">
              <Link href="/" className="block text-black">{t("Ana səhifə")}</Link>
              <Link href="/about" className="block text-black">{t("Haqqımızda")}</Link>
              <Link href="/courses" className="block text-black">{t("Dərslər")}</Link>
              <Link href="/trainer" className="block text-black">{t("Təlimçi")}</Link>
              <Link href="/contact" className="block text-black">{t("Əlaqə")}</Link>
              <button
                className="hidden md: w-70 mt-2 hover:text-white px-4 py-2  font-medium text-white"
                style={{
                  background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                }}
              >
                Kurs al
              </button>
            </div>
          )}
        </div>
      </div>



      <div className="mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-medium mb-2">Onlaynders.az</h1>
        <h2 className="text-4xl font-medium text-black-700 mb-6">
          İnteraktiv Kompüter Dərsləri Platforması
        </h2>
        <p className="subtitle text-gray-500 mb-12">
          Zamandan və məkandan asılı olmadan, öz sürətinlə ən son kompüter biliklərini öyrən!
        </p>

        <div className="icon cards flex flex-wrap justify-center gap-8 mb-8">
          <IoLogoWhatsapp fontSize={30} />
          <FaSquareInstagram fontSize={30} />
          <BsLinkedin fontSize={30} />
          <FaFacebookSquare fontSize={30} />
          <FaYoutube fontSize={30} />
        </div>



        <div className="hidden md:flex flex-wrap gap-[20px] justify-center px-4 md:px-8 pt-6 pr-5 pb-6 pl-5" style={{ gap: "25px" }}>
          <div
            className="text-white shadow-lg flex items-center overflow-hidden"
            style={{
              width: "404px",
              height: "172px",
              backgroundImage: "url('/foto1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "4px",
              borderBottomLeftRadius: "50px",
            }}
          >
            Onlaynders.az platforması, kompüter və texnologiya üzrə ən son yenilikləri öyrənmək istəyənlər üçün
            yaradılmış interaktiv bir tədris vasitəsidir.
          </div>

          <div
            className="text-white shadow-lg flex items-center overflow-hidden"
            style={{
              width: "404px",
              height: "172px",
              backgroundImage: "url('/foto2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "4px",
              borderBottomLeftRadius: "50px",
            }}
          >
            Yeni başlayanlar üçün anlaşıqlı və sadə dildə izahlar.
          </div>

          <div
            className="text-white shadow-lg flex items-center overflow-hidden"
            style={{
              width: "404px",
              height: "172px",
              backgroundImage: "url('/foto3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "4px",
              borderBottomLeftRadius: "50px",
            }}
          >
            Kurslar, addım-addım izahla birlikdə videolar və ətraflı izahlarla təklif olunur.
          </div>
        </div>


        {/* respansiv */}
       
<div className="block md:hidden px-4">
  <Swiper
    spaceBetween={8}
    slidesPerView={1}
    autoplay={{
      delay: 2000, 
      disableOnInteraction: false, 
    }}
    modules={[Autoplay]}
  >
    <SwiperSlide>
      <div
        className="text-white shadow-lg flex items-center pt-6 pr-5 pb-6 pl-5 mx-auto"
        style={{
          width: "100%",
          maxWidth: "404px",
          height: "172px",
          backgroundImage: "url('/foto1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "50px",
        }}
      >
        Onlaynders.az platforması, kompüter və texnologiya üzrə ən son yenilikləri öyrənmək istəyənlər üçün
        yaradılmış interaktiv bir tədris vasitəsidir.
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div
        className="text-white shadow-lg flex items-center pt-6 pr-5 pb-6 pl-5 mx-auto"
        style={{
          width: "100%",
          maxWidth: "404px",
          height: "172px",
          backgroundImage: "url('/foto2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "50px",
        }}
      >
        Yeni başlayanlar üçün anlaşıqlı və sadə dildə izahlar.
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div
        className="text-white shadow-lg flex items-center pt-6 pr-5 pb-6 pl-5 mx-auto"
        style={{
          width: "100%",
          maxWidth: "404px",
          height: "172px",
          backgroundImage: "url('/foto3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "50px",
        }}
      >
        Kurslar, addım-addım izahla birlikdə videolar və ətraflı izahlarla təklif olunur.
      </div>
    </SwiperSlide>
    
  </Swiper>
</div>

      </div>


      <div className="butere">
        <div className="max-w-10xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-medium mb-6">Onlaynders.az – Təhsil və İnnovasiya</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="text-black-700 mr-2">•</span>
                    <p>
                      "Onlaynders.az, müasir təhsil yanaşmalarını tətbiq edərək, kompüter və texnologiya sahəsində fərdi
                      inkişafı dəstəkləyən videodərslər təqdim edir."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black-700 mr-2">•</span>
                    <p>
                      "Bizim məqsədimiz, hər yaşda və hər təcrübə səviyyəsində olan insanlara komputer sahəsində inkişaf
                      etməyi təmin etməkdir."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black-700 mr-2">•</span>
                    <p>
                      "Platforma, sadə və interaktiv dizaynı ilə istənilən yerdən asanlıqla giriş imkanı təqdim edir."
                    </p>
                  </li>
                </ul>
                <div>
                  {/* Button */}
                  <button
                    className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Müraciət et
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-full w-full">
                  <div className="flex items-center justify-center p-8">
                    <div className="relative w-[500px] h-[400px]">
                      <Image
                        src="/komp.png"
                        alt="png"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                        style={{
                          borderRadius: "9px 95px 9px 95px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center text-3xl font-semibold mb-20">Yol Xəritəniz</h1>


      <div
        className="flex"
        style={{ width: "80%", margin: "210px auto", minWidth: "407px" }}
      >
        {/* 1 */}
        <div
          className="bg-blue-500 flex justify-center relative"
          style={{ width: "300px", height: "60px", alignItems: "center" }}
        >
          <div
            className="absolute bg-blue-500"
            style={{ width: "3px", height: "90px", top: "-90px" }}
          ></div>
          <div
            className="bg-blue-500 absolute flex justify-center"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              bottom: "150px",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <RiMoneyDollarCircleLine style={{ width: "40px", height: "40px" }} />
          </div>
          <div
            className="bg-white"
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          ></div>
          <div className="absolute" style={{ bottom: "-70px", color: "blue" }}>
            <p className="text-3xl font-bold text-center">1</p>
            <p className="text-lg font-bold">Kursu al</p>
          </div>
        </div>

        {/* 2 */}
        <div
          className="bg-green-500 flex justify-center relative"
          style={{ width: "300px", height: "60px", alignItems: "center" }}
        >
          <div
            className="absolute bg-green-500"
            style={{ width: "3px", height: "90px", bottom: "-90px" }}
          ></div>
          <div
            className="bg-green-500 absolute flex justify-center"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              top: "150px",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <FaRegPlayCircle style={{ width: "40px", height: "40px" }} />
          </div>
          <div
            className="bg-white"
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          ></div>
          <div className="absolute" style={{ top: "-70px", color: "green" }}>
            <p className="text-3xl font-bold text-center">2</p>
            <p className="text-lg font-bold">Dərsləri izlə</p>
          </div>
        </div>

        {/* 3 */}
        <div
          className="bg-yellow-500 flex justify-center relative"
          style={{ width: "300px", height: "60px", alignItems: "center" }}
        >
          <div
            className="absolute bg-yellow-500"
            style={{ width: "3px", height: "90px", top: "-90px" }}
          ></div>
          <div
            className="bg-yellow-500 absolute flex justify-center"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              bottom: "150px",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <PiExamLight style={{ width: "40px", height: "40px" }} />
          </div>
          <div
            className="bg-white"
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          ></div>
          <div className="absolute" style={{ bottom: "-70px", color: "orange" }}>
            <p className="text-3xl font-bold text-center">3</p>
            <p className="text-lg font-bold">İmtahan ver</p>
          </div>
        </div>

        {/* 4 */}
        <div
          className="bg-red-500 flex justify-center relative"
          style={{ width: "300px", height: "60px", alignItems: "center" }}
        >
          <div
            className="absolute bg-red-500"
            style={{ width: "3px", height: "90px", bottom: "-90px" }}
          ></div>
          <div
            className="bg-red-500 absolute flex justify-center"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              top: "150px",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <PiCertificate style={{ width: "40px", height: "40px" }} />
          </div>
          <div
            className="bg-white"
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          ></div>
          <div className="absolute" style={{ top: "-70px", color: "red" }}>
            <p className="text-3xl font-bold text-center">4</p>
            <p className="text-lg font-bold">Sertifikat qazan</p>
          </div>
        </div>
        <style>

        </style>
      </div >
      <div className="vvv"  style={{ backgroundColor: "#EFEEEE" }}>
        <div className=" hidden md:block bg-[#efeee] py-20" style={{
          width: "80%",
          margin: "100px auto",
          gap:"10px"
        }}>
          <div className="container mx-auto px-4" >
            <h2 className="text-4xl font-medium text-center mb-12">Dərslər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              {/* Kurs kartı 1 */}
              <div className="flex bg-white rounded-2xl shadow-lg w-[200px] h-[140px] p-3 items-center relative overflow-visible">
                {/* Şəkil hissəsi */}
                <div className="relative flex-shrink-0" style={{ width: "140px", height: "140px" }}>
                  <div
                    className="bg-white rounded-2xl shadow-lg"
                    style={{
                      width: "160px",
                      height: "160px",
                      position: "absolute",
                      left: "-50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)"
                    }}
                  >
                    <img
                      src="/foto11.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(39,123,233,0.10)" }}

                    />
                  </div>
                </div>
            
                <div>
                  <span className="text-gray-500 text-sm">26 December 2019</span>
                  <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                  </p>
                  <button
                    className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Kursu al
                  </button>
                </div>
              </div>


              {/* Kurs kartı 2 */}
              <div className="flex bg-white rounded-2xl shadow-lg w-[200px] h-[140px] p-3 items-center relative overflow-visible">
                {/* Şəkil hissəsi */}
                <div className="relative flex-shrink-0" style={{ width: "140px", height: "140px" }}>
                  <div
                    className="bg-white rounded-2xl shadow-lg"
                    style={{
                      width: "160px",
                      height: "160px",
                      position: "absolute",
                      left: "-50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)"
                    }}
                  >
                    <img
                      src="/foto12.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(39,123,233,0.10)" }}
                      
                    />
                  </div>
                </div>
               
                <div>
                  <span className="text-gray-500 text-sm">26 December 2019</span>
                  <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                  </p>
                  <button
                    className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Kursu al
                  </button>
                </div>
              </div>
              {/* Kurs kartı 3 */}
             <div className="flex bg-white rounded-2xl shadow-lg w-[200px] h-[140px] p-3 items-center relative overflow-visible">
              
                <div className="relative flex-shrink-0" style={{ width: "140px", height: "140px" }}>
                  <div
                    className="bg-white rounded-2xl shadow-lg"
                    style={{
                      width: "160px",
                      height: "160px",
                      position: "absolute",
                      left: "-50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)"
                    }}
                  >
                    <img
                      src="/foto13.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(39,123,233,0.10)" }}
                      
                    />
                  </div>
                </div>
               
                <div>
                  <span className="text-gray-500 text-sm">26 December 2019</span>
                  <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                  </p>
                  <button
                    className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Kursu al
                  </button>
                </div>
              </div>
              {/* Kurs kartı 4 */}
              <div className="flex bg-white rounded-2xl shadow-lg w-[200px] h-[140px] p-3 items-center relative overflow-visible">
               
                <div className="relative flex-shrink-0" style={{ width: "140px", height: "140px" }}>
                  <div
                    className="bg-white rounded-2xl shadow-lg"
                    style={{
                      width: "160px",
                      height: "160px",
                      position: "absolute",
                      left: "-50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)"
                    }}
                  >
                    <img
                      src="/foto15.jpg"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(39,123,233,0.10)" }}
                      
                    />
                  </div>
                </div>
               
                <div>
                  <span className="text-gray-500 text-sm">26 December 2019</span>
                  <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                  </p>
                  <button
                    className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Kursu al
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>





        {/* respansiv (karusel) */}
<div className="block md:hidden py-12 bg-[#F8F8F8]">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-medium text-center mb-8">Dərslər</h2>
    <Slider
      dots={true}
      infinite={false}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {/* Kart 1 */}
      <div
        className="flex flex-col bg-white shadow-lg w-full max-w-[340px] h-[340px] p-6 items-center justify-center relative overflow-visible mx-auto"
        style={{
          borderRadius: "0px", 
        }}
      >
        <div className="p-0 mb-4 flex-shrink-0 flex justify-center items-center w-[110px] h-[110px]">
          <img
            src="/foto11.png"
            alt="Kurs şəkli"
            className="w-[110px] h-[110px] object-contain"
            style={{ borderRadius: "0px" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow text-center">
          <span className="text-gray-500 text-sm mb-2">26 December 2019</span>
          <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
          </p>
          <button
            className="hover:text-white px-8 py-2 rounded-none font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
            }}
          >
            Kursu al
          </button>
        </div>
      </div>

      {/* Kart 2 */}
      <div
        className="flex flex-col bg-white shadow-lg w-full max-w-[340px] h-[340px] p-6 items-center justify-center relative overflow-visible mx-auto"
        style={{
          borderRadius: "0px",
        }}
      >
        <div className="p-0 mb-4 flex-shrink-0 flex justify-center items-center w-[110px] h-[110px]">
          <img
            src="/foto12.png"
            alt="Kurs şəkli"
            className="w-[110px] h-[110px] object-contain"
            style={{ borderRadius: "0px" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow text-center">
          <span className="text-gray-500 text-sm mb-2">26 December 2019</span>
          <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
          </p>
          <button
            className="hover:text-white px-8 py-2 rounded-none font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
            }}
          >
            Kursu al
          </button>
        </div>
      </div>

      {/* Kart 3 */}
      <div
        className="flex flex-col bg-white shadow-lg w-full max-w-[340px] h-[340px] p-6 items-center justify-center relative overflow-visible mx-auto"
        style={{
          borderRadius: "0px",
        }}
      >
        <div className="p-0 mb-4 flex-shrink-0 flex justify-center items-center w-[110px] h-[110px]">
          <img
            src="/foto13.png"
            alt="Kurs şəkli"
            className="w-[110px] h-[110px] object-contain"
            style={{ borderRadius: "0px" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow text-center">
          <span className="text-gray-500 text-sm mb-2">26 December 2019</span>
          <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
          </p>
          <button
            className="hover:text-white px-8 py-2 rounded-none font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
            }}
          >
            Kursu al
          </button>
        </div>
      </div>

      {/* Kart 4 */}
     <div
        className="flex flex-col bg-white shadow-lg w-full max-w-[340px] h-[340px] p-6 items-center justify-center relative overflow-visible mx-auto"
        style={{
          borderRadius: "0px", 
        }}
      >
        <div className="p-0 mb-4 flex-shrink-0 flex justify-center items-center w-[110px] h-[110px]">
          <img
            src="/foto15.png"
            alt="Kurs şəkli"
            className="w-[110px] h-[110px] object-contain"
            style={{ borderRadius: "0px" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow text-center">
          <span className="text-gray-500 text-sm mb-2">26 December 2019</span>
          <h3 className="text-lg font-bold my-2">Lorem ipsum dolor</h3>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
          </p>
          <button
            className="hover:text-white px-8 py-2 rounded-none font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
            }}
          >
            Kursu al
          </button>
        </div>
      </div>
    </Slider>
  </div>
</div>


      </div>




      {/* Təlimçi bölməsi */}
      <div className="bg-white py-20" style={{
        width: "80%",
        margin: "0 auto"
      }}>
        {/* Başlıq */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-gray-900">Təlimçi</h2>
        </div>

        {/* text */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Sol tərəf - Yazılar */}
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Orxan Məmmədov</h3>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Varius enim eu ac tempus integer. In urna eget tortor morbi odio
              sed et tincidunt. Massa eget eu scelerisque egestas arcu enim semper. Amet sociis ut gravida mus varius
              facilisis tristique. Nisl mauris malesuada id massa. Viverra amet sem non lectus turpis dignissim gravida
              dui. Vulputate ornare vitae vel id. Praesent augue vitae feugiat quis in mauris velit dui nibh. Sed elit
              odio imperdiet semper quam eget ultrices. Eu adipiscing mauris adipiscing porttitor ut egestas arcu varius
              massa. Nunc ipsum ornare tellus tristique eget vitae augue mi.d
            </p>
          </div>

          {/* Şəkil */}
          <div className="md:w-1/2 flex justify-center">
            <div
              className="w-[150px] h-[100px] shadow-xl relative"
              style={{
                background: "linear-gradient(180deg, #EEEEEE 0%, #082C81 100%)",
                borderRadius: "200px 20px 0px 0px",
                width: "370px",
                height: "400px",



              }}
            >
              <img src="/orxan.png" alt="Orxan Məmmədov" className="object-cover absolute" style={
                {
                  width: "496px",
                  height: "500px",
                  bottom: "-40px",
                  right: "-10px",

                }
              } />
            </div>
          </div>

        </div>
      </div>

      {/* Əlaqə forması bölməsi */}
      <div className="flex items-center justify-center p-4" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="w-full max-w-2xl p-8">
          <h1 className="text-4xl font-semibold text-center mb-12 text-black">Əlaqə</h1>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            {/* Ad və Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="ad" className="text-[16px] font-medium text-black block">Ad</label>
                <input
                  id="ad"
                  name="ad"
                  type="text"
                  placeholder="Ismixan"
                  value={contactFormData.ad}
                  onChange={handleContactInputChange}
                  className="h-12 w-full bg-[#EFEEEE] border border-black px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="soyad" className="text-[16px] font-medium text-black block">Soyad</label>
                <input
                  id="soyad"
                  name="soyad"
                  type="text"
                  placeholder="Ismixanov"
                  value={contactFormData.soyad}
                  onChange={handleContactInputChange}
                  className="h-12 w-full bg-[#EFEEEE] border border-black px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-[16px] font-medium text-black block">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Example@gmail.com"
                value={contactFormData.email}
                onChange={handleContactInputChange}
                className="h-12 w-full bg-[#EFEEEE] border border-black px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black"
              />
            </div>

            {/* Telefon nömrəsi */}
            <div className="space-y-2">
              <label htmlFor="telefon" className="text-[16px] font-medium text-black block">Telefon nömrəsi</label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                placeholder="099 999 99 99"
                value={contactFormData.telefon}
                onChange={handleContactInputChange}
                className="h-12 w-full bg-[#EFEEEE] border border-black px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black"
              />
            </div>

            {/* Mesaj */}
            <div className="space-y-2">
              <label htmlFor="mesaj" className="text-[16px] font-medium text-black block">Mesaj</label>
              <textarea
                id="mesaj"
                name="mesaj"
                value={contactFormData.mesaj}
                onChange={handleContactInputChange}
                rows={6}
                placeholder=""
                className="w-full bg-[#EFEEEE] border border-black px-4 py-2 text-black placeholder:text-gray-500 rounded resize-none focus:outline-none focus:border-black"
              />
            </div>

            {/* Button */}
            <div className="flex justify-end pt-4">
              <button
                className="hover:text-white px-8 py-2 rounded-full font-medium text-white"
                style={{
                  background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                }}
              >
                Göndər
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* Footer */}
      <footer className="w-full mt-20 py-8" style={{ backgroundColor: '#f1f1f1', marginTop: "50px" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo */}
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="grid grid-cols-2 gap-1 w-8 h-8">
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-green-500 rounded-sm"></div>
                  <div className="bg-yellow-500 rounded-sm"></div>
                  <div className="bg-red-500 rounded-sm"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Onlaynders.az</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Varius enim eu ac tempus integer. In urna eget tortor morbi odio sed et tincidunt.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Ana səhifə</h3>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-black hover:text-gray-800 transition-colors">Haqqımızda</a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors">Dərslər</a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors">Əlaqə</a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors">Təlimçi</a>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Əlaqə məlumatları</h3>
              <p className="text-gray-600 text-sm">Hər hansı sualınız varsa bizimlə əlaqə saxlayın</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-black" />
                  <span className="text-black">+009 980 92 98</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-black" />
                  <span className="text-black">info.onlayders@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-black" />
                  <span className="text-black">Bakı, Azərbaycan</span>
                </div>

                {/* ikonlar */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <IoLogoWhatsapp fontSize={24} className="text-black hover:text-green-500 transition-colors" />
                  <FaSquareInstagram fontSize={24} className="text-black hover:text-pink-500 transition-colors" />
                  <BsLinkedin fontSize={24} className="text-black hover:text-blue-700 transition-colors" />
                  <FaFacebookSquare fontSize={24} className="text-black hover:text-blue-600 transition-colors" />
                  <FaYoutube fontSize={24} className="text-black hover:text-red-600 transition-colors" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>





    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default HomePage
