"use client"
import Head from "next/head"
import { DM_Sans } from "next/font/google"
import { useTranslation } from "react-i18next"
import AuthLayout from "@/app/AuthLayout"
import { useState, useEffect, useRef } from "react"
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
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { PiCertificate } from "react-icons/pi"
import { PiExamLight } from "react-icons/pi"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Menu, X } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { Autoplay } from "swiper/modules"
import { motion, useInView } from "framer-motion"

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

  // Animation ref for the butere section
  const animationRef = useRef(null)
  const isInView = useInView(animationRef, { once: true, amount: 0.3 })

  // Animation ref for the trainer section
  const trainerRef = useRef(null)
  const isTrainerInView = useInView(trainerRef, { once: true, amount: 0.3 })

  // Animation ref for the contact section
  const contactRef = useRef(null)
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 })

  // Animation ref for the courses section
  const coursesRef = useRef(null)
  const isCoursesInView = useInView(coursesRef, { once: true, amount: 0.3 })

  // Animation ref for the footer section
  const footerRef = useRef(null)
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.3 })

  // Animation variants
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const fallDownVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  // Roadmap animation states
  const [openStep, setOpenStep] = useState([true, true, true, true])
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const handleToggle = (idx) => {
    setOpenStep((prev) => prev.map((v, i) => (i === idx ? !v : v)))
    // Pause auto-play when user manually interacts
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume after 5 seconds
  }

  // Auto-play animation effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % 4
        // Close current step and open next step
        setOpenStep((prevSteps) => {
          const newSteps = [...prevSteps]
          // Close all steps first
          newSteps.fill(false)
          // Open the next step
          newSteps[nextStep] = true
          return newSteps
        })
        return nextStep
      })
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

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
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
        .card-initial {
          opacity: 0;
          transform: translateX(-100%);
        }
        .card-initial-right {
          opacity: 0;
          transform: translateX(100%);
        }
        .card-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        /* 320px responsive fixes */
        @media (max-width: 320px) {
          .roadmap-container {
            transform: scale(0.7);
            transform-origin: center;
          }
          .roadmap-step {
            width: 200px !important;
            height: 40px !important;
          }
          .roadmap-circle {
            width: 40px !important;
            height: 40px !important;
          }
          .roadmap-icon {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `}</style>
      <Head>
        <title>Onlaynders.az</title>
        <meta name="description" content="Online dərs platforması" />
      </Head>

      <div className="buter">
        <div className="mx-auto px-2 sm:px-4 lg:px-8">
          <div className="bg-white shadow-sm relative py-2 sm:py-4">
            <div className="container mx-auto px-2 sm:px-6 max-w-screen-2xl flex items-center justify-between">
              {/* Logo və menyu */}
              <div className="flex items-center justify-start gap-2 sm:gap-6">
                <div className="w-4 h-4 sm:w-5 sm:h-5 grid grid-cols-2 gap-0.5">
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-red-500 rounded-sm"></div>
                  <div className="bg-yellow-500 rounded-sm"></div>
                  <div className="bg-green-500 rounded-sm"></div>
                </div>
                <span className="block md:hidden font-semibold text-sm sm:text-base text-black">Onlaynders.az</span>
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

              {/* Mobil hamburger ikonu */}
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobil menyuu hissə */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-md rounded px-2 sm:px-4 py-4 space-y-3">
              <Link href="/" className="block text-black text-sm">
                {t("Ana səhifə")}
              </Link>
              <Link href="/about" className="block text-black text-sm">
                {t("Haqqımızda")}
              </Link>
              <Link href="/courses" className="block text-black text-sm">
                {t("Dərslər")}
              </Link>
              <Link href="/trainer" className="block text-black text-sm">
                {t("Təlimçi")}
              </Link>
              <Link href="/contact" className="block text-black text-sm">
                {t("Əlaqə")}
              </Link>
              <button
                className="w-100 mt-2 hover:text-white px-4 py-2 rounded-full font-medium text-white text-sm"
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

      <div className="mx-auto px-2 sm:px-4 py-8 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-4xl font-medium mb-2">Onlaynders.az</h1>
        <h2 className="text-xl sm:text-4xl font-medium text-black-700 mb-4 sm:mb-6 px-2">
          İnteraktiv Kompüter Dərsləri Platforması
        </h2>
        <p className="subtitle text-gray-500 mb-8 sm:mb-12 text-sm sm:text-base px-2">
          Zamandan və məkandan asılı olmadan, öz sürətinlə ən son kompüter biliklərini öyrən!
        </p>
        <div className="icon cards flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-gray-600">
          <IoLogoWhatsapp
            fontSize={24}
            className="sm:text-[30px] hover:text-[#25D366] transition-colors duration-300"
          />
          <FaSquareInstagram
            fontSize={24}
            className="sm:text-[30px] hover:text-[#E1306C] transition-colors duration-300"
          />
          <BsLinkedin
            fontSize={24}
            className="sm:text-[28px] hover:text-[#0077B5] transition-colors duration-300"
          />
          <FaFacebookSquare
            fontSize={24}
            className="sm:text-[30px] hover:text-[#1877F2] transition-colors duration-300"
          />
          <FaYoutube
            fontSize={24}
            className="sm:text-[34px] hover:text-[#FF0000] transition-colors duration-300"
          />
        </div>


        <div
          className="hidden md:flex flex-wrap gap-[20px] justify-center px-4 md:px-8 pt-6 pr-5 pb-6 pl-5"
          style={{ gap: "25px" }}
        >
          <div
            className="text-white shadow-lg flex items-center justify-center text-center p-4 text-sm overflow-hidden"
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
            className="text-white shadow-lg flex items-center justify-center text-center overflow-hidden"
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
            className="text-white shadow-lg flex items-center justify-center text-center p-4 text-sm overflow-hidden"
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
        <div className="block md:hidden px-2 sm:px-4">
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
                className="text-white shadow-lg flex items-center pt-4 pr-3 pb-4 pl-3 mx-auto text-xs sm:text-sm"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "140px",
                  backgroundImage: "url('/foto1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "4px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                Onlaynders.az platforması, kompüter və texnologiya üzrə ən son yenilikləri öyrənmək istəyənlər üçün
                yaradılmış interaktiv bir tədris vasitəsidir.
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="text-white shadow-lg flex items-center pt-4 pr-3 pb-4 pl-3 mx-auto text-xs sm:text-sm"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "140px",
                  backgroundImage: "url('/foto2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "4px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                Yeni başlayanlar üçün anlaşıqlı və sadə dildə izahlar.
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="text-white shadow-lg flex items-center pt-4 pr-3 pb-4 pl-3 mx-auto text-xs sm:text-sm"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "140px",
                  backgroundImage: "url('/foto3.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "4px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                Kurslar, addım-addım izahla birlikdə videolar və ətraflı izahlarla təklif olunur.
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="butere" ref={animationRef}>
        <div className="max-w-10xl mx-auto px-2 sm:px-4 py-8 sm:py-12 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="md:w-1/2 p-4 sm:p-8 flex flex-col justify-center"
                variants={leftVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <h2 className="text-2xl sm:text-4xl font-medium mb-4 sm:mb-6">Onlaynders.az – Təhsil və İnnovasiya</h2>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-start">
                    <span className="text-black-700 mr-2 text-sm sm:text-base">•</span>
                    <p className="text-sm sm:text-base">
                      "Onlaynders.az, müasir təhsil yanaşmalarını tətbiq edərək, kompüter və texnologiya sahəsində fərdi
                      inkişafı dəstəkləyən videodərslər təqdim edir."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black-700 mr-2 text-sm sm:text-base">•</span>
                    <p className="text-sm sm:text-base">
                      "Bizim məqsədimiz, hər yaşda və hər təcrübə səviyyəsində olan insanlara komputer sahəsində inkişaf
                      etməyi təmin etməkdir."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black-700 mr-2 text-sm sm:text-base">•</span>
                    <p className="text-sm sm:text-base">
                      "Platforma, sadə və interaktiv dizaynı ilə istənilən yerdən asanlıqla giriş imkanı təqdim edir."
                    </p>
                  </li>
                </ul>
                <div>
                  <button
                    className="hover:text-white px-4 sm:px-8 py-2 rounded-full font-medium text-white text-sm sm:text-base"
                    style={{
                      background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                    }}
                  >
                    Müraciət et
                  </button>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/2"
                variants={rightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="relative h-full w-full">
                  <div className="flex items-center justify-center p-4 sm:p-8">
                    <div className="relative w-[280px] h-[220px] sm:w-[500px] sm:h-[400px]">
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Yol Xəritəsi */}
      <div className="w-full py-12 sm:py-20">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-12 sm:mb-20 px-2">Yol Xəritəniz</h1>
        <div className="text-center mb-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-6 py-2 rounded-full text-sm font-medium transition-colors"
          ></button>
        </div>
        <div
          className="roadmap-container flex justify-center items-center px-2"
          style={{ width: "80%", margin: "100px auto 100px auto", minWidth: "280px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Step 1 */}
          <div
            className="roadmap-step bg-blue-500 flex justify-center relative"
            style={{ width: "300px", height: "60px", alignItems: "center" }}
          >
            <div className="absolute bg-blue-500" style={{ width: "3px", height: "90px", top: "-90px" }}></div>
            <div
              className="roadmap-circle bg-blue-500 absolute flex justify-center cursor-pointer"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                bottom: "150px",
                alignItems: "center",
                color: "#fff",
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: openStep[0] ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(180deg)",
                opacity: openStep[0] ? 1 : 0.3,
                boxShadow: openStep[0] ? "0 8px 25px rgba(10, 76, 165, 0.4)" : "0 2px 8px rgba(10, 76, 165, 0.2)",
              }}
              onClick={() => handleToggle(0)}
              onMouseEnter={(e) => {
                if (openStep[0]) {
                  e.currentTarget.style.transform = "scale(1.1) rotate(0deg)"
                }
              }}
              onMouseLeave={(e) => {
                if (openStep[0]) {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)"
                }
              }}
            >
              <RiMoneyDollarCircleLine className="roadmap-icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <div className="bg-white" style={{ width: "20px", height: "20px", borderRadius: "50%" }}></div>
            <div
              className="absolute transition-all duration-700"
              style={{
                bottom: "-70px",
                color: "blue",
                transform: openStep[0] ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)",
                opacity: openStep[0] ? 1 : 0.5,
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-center">1</p>
              <p className="text-sm sm:text-lg font-bold">Kursu al</p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="roadmap-step bg-green-500 flex justify-center relative"
            style={{ width: "300px", height: "60px", alignItems: "center" }}
          >
            <div className="absolute bg-green-500" style={{ width: "3px", height: "90px", bottom: "-90px" }}></div>
            <div
              className="roadmap-circle bg-green-500 absolute flex justify-center cursor-pointer"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                top: "150px",
                alignItems: "center",
                color: "#fff",
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: openStep[1] ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(180deg)",
                opacity: openStep[1] ? 1 : 0.3,
                boxShadow: openStep[1] ? "0 8px 25px rgba(34, 197, 94, 0.4)" : "0 2px 8px rgba(34, 197, 94, 0.2)",
              }}
              onClick={() => handleToggle(1)}
              onMouseEnter={(e) => {
                if (openStep[1]) {
                  e.currentTarget.style.transform = "scale(1.1) rotate(0deg)"
                }
              }}
              onMouseLeave={(e) => {
                if (openStep[1]) {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)"
                }
              }}
            >
              <FaRegPlayCircle className="roadmap-icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <div className="bg-white" style={{ width: "20px", height: "20px", borderRadius: "50%" }}></div>
            <div
              className="absolute transition-all duration-700"
              style={{
                top: "-70px",
                color: "green",
                transform: openStep[1] ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.8)",
                opacity: openStep[1] ? 1 : 0.5,
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-center">2</p>
              <p className="text-sm sm:text-lg font-bold">Dərsləri izlə</p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="roadmap-step bg-yellow-500 flex justify-center relative"
            style={{ width: "300px", height: "60px", alignItems: "center" }}
          >
            <div className="absolute bg-yellow-500" style={{ width: "3px", height: "90px", top: "-90px" }}></div>
            <div
              className="roadmap-circle bg-yellow-500 absolute flex justify-center cursor-pointer"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                bottom: "150px",
                alignItems: "center",
                color: "#fff",
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: openStep[2] ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(180deg)",
                opacity: openStep[2] ? 1 : 0.3,
                boxShadow: openStep[2] ? "0 8px 25px rgba(234, 179, 8, 0.4)" : "0 2px 8px rgba(234, 179, 8, 0.2)",
              }}
              onClick={() => handleToggle(2)}
              onMouseEnter={(e) => {
                if (openStep[2]) {
                  e.currentTarget.style.transform = "scale(1.1) rotate(0deg)"
                }
              }}
              onMouseLeave={(e) => {
                if (openStep[2]) {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)"
                }
              }}
            >
              <PiExamLight className="roadmap-icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <div className="bg-white" style={{ width: "20px", height: "20px", borderRadius: "50%" }}></div>
            <div
              className="absolute transition-all duration-700"
              style={{
                bottom: "-70px",
                color: "orange",
                transform: openStep[2] ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)",
                opacity: openStep[2] ? 1 : 0.5,
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-center">3</p>
              <p className="text-sm sm:text-lg font-bold">İmtahan ver</p>
            </div>
          </div>

          {/* Step 4 */}
          <div
            className="roadmap-step bg-red-500 flex justify-center relative"
            style={{ width: "300px", height: "60px", alignItems: "center" }}
          >
            <div className="absolute bg-red-500" style={{ width: "3px", height: "90px", bottom: "-90px" }}></div>
            <div
              className="roadmap-circle bg-red-500 absolute flex justify-center cursor-pointer"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                top: "150px",
                alignItems: "center",
                color: "#fff",
                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: openStep[3] ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(180deg)",
                opacity: openStep[3] ? 1 : 0.3,
                boxShadow: openStep[3] ? "0 8px 25px rgba(239, 68, 68, 0.4)" : "0 2px 8px rgba(239, 68, 68, 0.2)",
              }}
              onClick={() => handleToggle(3)}
              onMouseEnter={(e) => {
                if (openStep[3]) {
                  e.currentTarget.style.transform = "scale(1.1) rotate(0deg)"
                }
              }}
              onMouseLeave={(e) => {
                if (openStep[3]) {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)"
                }
              }}
            >
              <PiCertificate className="roadmap-icon" style={{ width: "40px", height: "40px" }} />
            </div>
            <div className="bg-white" style={{ width: "20px", height: "20px", borderRadius: "50%" }}></div>
            <div
              className="absolute transition-all duration-700"
              style={{
                top: "-70px",
                color: "red",
                transform: openStep[3] ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.8)",
                opacity: openStep[3] ? 1 : 0.5,
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-center">4</p>
              <p className="text-sm sm:text-lg font-bold">Sertifikat qazan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="vvv" style={{ backgroundColor: "#f1f1f1" }}>
        <div
          className="cards-section hidden md:block bg-[#efeee] py-20"
          style={{
            width: "80%",
            margin: "100px auto",
            gap: "10px",
          }}
          ref={coursesRef}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-medium text-center mb-12">Dərslər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
              {/* Kurs kartı 1*/}
              <motion.div
                className="flex bg-white rounded-2xl shadow-lg w-[540px] h-[210px] p-3 items-center relative overflow-visible"
                variants={leftVariants}
                initial="hidden"
                animate={isCoursesInView ? "visible" : "hidden"}
              >
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
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)",
                    }}
                  >
                    <img
                      src="/foto11.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(28, 84, 158, 0.9)" }}
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
              </motion.div>

              {/* Kurs kartı 2  */}
              <motion.div
                className="flex bg-white rounded-2xl shadow-lg w-[540px] h-[210px] p-3 items-center relative overflow-visible"
                variants={rightVariants}
                initial="hidden"
                animate={isCoursesInView ? "visible" : "hidden"}
              >
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
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)",
                    }}
                  >
                    <img
                      src="/foto12.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(28, 84, 158, 0.9)" }}
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
              </motion.div>

              {/* Kurs kartı 3 */}
              <motion.div
                className="flex bg-white rounded-2xl shadow-lg w-[540px] h-[210px] p-3 items-center relative overflow-visible"
                variants={leftVariants}
                initial="hidden"
                animate={isCoursesInView ? "visible" : "hidden"}
              >
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
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)",
                    }}
                  >
                    <img
                      src="/foto13.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(28, 84, 158, 0.9)" }}
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
              </motion.div>

              {/* Kurs kartı 4  */}
              <motion.div
                className="flex bg-white rounded-2xl shadow-lg w-[540px] h-[210px] p-3 items-center relative overflow-visible"
                variants={rightVariants}
                initial="hidden"
                animate={isCoursesInView ? "visible" : "hidden"}
              >
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
                      boxShadow: "0 8px 24px 0 rgba(39,123,233,0.15)",
                    }}
                  >
                    <img
                      src="/foto15.png"
                      alt="Kurs şəkli"
                      className="w-[190px] h-[190px] object-contain rounded-xl"
                      style={{ boxShadow: "0 4px 16px 0 rgba(28, 84, 158, 0.9)" }}
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* respansiv (karusel) */}
        <div className="block md:hidden py-8 sm:py-12 bg-[#F8F8F8]">
          <div className="container mx-auto px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-center mb-6 sm:mb-8">Dərslər</h2>
            <Slider
              dots={true}
              infinite={false}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={2000}
              centerMode={false}
              responsive={[
                {
                  breakpoint: 1300,
                  settings: {
                    slidesToShow: 1,
                    centerMode: false,
                  },
                },
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 1,
                    centerMode: false,
                  },
                },
              ]}
            >
              {/* Kart 1 */}
              <div className="px-2 sm:px-4">
                <div
                  className="flex flex-col bg-white shadow-lg items-center justify-center relative overflow-visible mx-auto rounded-lg"
                  style={{
                    width: "280px",
                    height: "350px",
                    gap: "20px",
                    paddingTop: "20px",
                    paddingRight: "8px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                  }}
                >
                  {/* Şəkil çərçivəsi ilə */}
                  <div className="flex justify-center items-center w-full">
                    <div className="w-[100px] h-[100px] flex justify-center items-center bg-[#F1F5F9] border-2 border-blue-500 rounded-lg p-2">
                      <img src="/foto11.png" alt="Kurs şəkli" className="w-[80px] h-[80px] object-contain rounded-lg" />
                    </div>
                  </div>
                  {/* Mətni hissə */}
                  <div className="flex flex-col justify-center items-center text-center flex-grow px-2">
                    <span className="text-gray-500 text-xs mb-2">26 December 2019</span>
                    <h3 className="text-base font-bold my-2">Lorem ipsum dolor</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                    </p>
                    <button
                      className="hover:text-white px-4 py-2 font-medium text-white text-sm"
                      style={{
                        background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                        borderRadius: "80px",
                      }}
                    >
                      Kursu al
                    </button>
                  </div>
                </div>
              </div>

              {/* Kart 2 */}
              <div className="px-2 sm:px-4">
                <div
                  className="flex flex-col bg-white shadow-lg items-center justify-center relative overflow-visible mx-auto rounded-lg"
                  style={{
                    width: "280px",
                    height: "350px",
                    gap: "20px",
                    paddingTop: "20px",
                    paddingRight: "8px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                  }}
                >
                  {/* Şəkil çərçivəsi ilə */}
                  <div className="flex justify-center items-center w-full">
                    <div className="w-[100px] h-[100px] flex justify-center items-center bg-[#F1F5F9] border-2 border-blue-500 rounded-lg p-2">
                      <img src="/foto12.png" alt="Kurs şəkli" className="w-[80px] h-[80px] object-contain rounded-lg" />
                    </div>
                  </div>
                  {/* Mətni hissə */}
                  <div className="flex flex-col justify-center items-center text-center flex-grow px-2">
                    <span className="text-gray-500 text-xs mb-2">26 December 2019</span>
                    <h3 className="text-base font-bold my-2">Lorem ipsum dolor</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                    </p>
                    <button
                      className="hover:text-white px-4 py-2 font-medium text-white text-sm"
                      style={{
                        background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                        borderRadius: "80px",
                      }}
                    >
                      Kursu al
                    </button>
                  </div>
                </div>
              </div>

              {/* Kart 3 */}
              <div className="px-2 sm:px-4">
                <div
                  className="flex flex-col bg-white shadow-lg items-center justify-center relative overflow-visible mx-auto rounded-lg"
                  style={{
                    width: "280px",
                    height: "350px",
                    gap: "20px",
                    paddingTop: "20px",
                    paddingRight: "8px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                  }}
                >
                  <div className="flex justify-center items-center w-full">
                    <div className="w-[100px] h-[100px] flex justify-center items-center bg-[#F1F5F9] border-2 border-blue-500 rounded-lg p-2">
                      <img src="/foto13.png" alt="Kurs şəkli" className="w-[80px] h-[80px] object-contain rounded-lg" />
                    </div>
                  </div>
                  {/* Mətni hissə */}
                  <div className="flex flex-col justify-center items-center text-center flex-grow px-2">
                    <span className="text-gray-500 text-xs mb-2">26 December 2019</span>
                    <h3 className="text-base font-bold my-2">Lorem ipsum dolor</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                    </p>
                    <button
                      className="hover:text-white px-4 py-2 font-medium text-white text-sm"
                      style={{
                        background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                        borderRadius: "80px",
                      }}
                    >
                      Kursu al
                    </button>
                  </div>
                </div>
              </div>

              {/* Kart 4 */}
              <div className="px-2 sm:px-4">
                <div
                  className="flex flex-col bg-white shadow-lg items-center justify-center relative overflow-visible mx-auto rounded-lg"
                  style={{
                    width: "280px",
                    height: "350px",
                    gap: "20px",
                    paddingTop: "20px",
                    paddingRight: "8px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                  }}
                >
                  {/* Şəkil çərçivəsi ilə */}
                  <div className="flex justify-center items-center w-full">
                    <div className="w-[100px] h-[100px] flex justify-center items-center bg-[#F1F5F9] border-2 border-blue-500 rounded-lg p-2">
                      <img src="/foto15.png" alt="Kurs şəkli" className="w-[80px] h-[80px] object-contain rounded-lg" />
                    </div>
                  </div>
                  {/* Mətni hissə */}
                  <div className="flex flex-col justify-center items-center text-center flex-grow px-2">
                    <span className="text-gray-500 text-xs mb-2">26 December 2019</span>
                    <h3 className="text-base font-bold my-2">Lorem ipsum dolor</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      Lorem ipsum dolor sit amet consectetur. Amet dictum tincidunt at quisque odio vitae aliquet neque.
                    </p>
                    <button
                      className="hover:text-white px-4 py-2 font-medium text-white text-sm"
                      style={{
                        background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                        borderRadius: "80px",
                      }}
                    >
                      Kursu al
                    </button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* Təlimçi bölməsi */}
      <div
        className="bg-white py-12 sm:py-20"
        style={{
          width: "80%",
          margin: "0 auto",
        }}
        ref={trainerRef}
      >
        {/* Başlıq */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-medium text-gray-900 px-2">Təlimçi</h2>
        </div>

        {/* text */}
        <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
          <motion.div
            className="md:w-1/2 text-left px-2 sm:px-4"
            variants={leftVariants}
            initial="hidden"
            animate={isTrainerInView ? "visible" : "hidden"}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Orxan Məmmədov</h3>
            <p className="text-xs sm:text-sm md:text-[16px] text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Varius enim eu ac tempus integer. In urna eget tortor morbi odio
              sed et tincidunt. Massa eget eu scelerisque egestas arcu enim semper. Amet sociis ut gravida mus varius
              facilisis tristique. Nisl mauris malesuada id massa. Viverra amet sem non lectus turpis dignissim gravida
              dui. Vulputate ornare vitae vel id. Praesent augue vitae feugiat quis in mauris velit dui nibh. Sed elit
              odio imperdiet semper quam eget ultrices. Eu adipiscing mauris adipiscing porttitor ut egestas arcu varius
              massa. Nunc ipsum ornare tellus tristique eget vitae augue mi.
            </p>
          </motion.div>

          {/*orxan.m Şəkil */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            variants={rightVariants}
            initial="hidden"
            animate={isTrainerInView ? "visible" : "hidden"}
          >
            <div
              className="shadow-xl relative w-[200px] h-[220px] sm:w-[280px] sm:h-[300px] md:w-[370px] md:h-[400px] lg:w-[420px] lg:h-[450px] xl:w-[460px] xl:h-[480px]"
              style={{
                background: "linear-gradient(180deg, #EEEEEE 0%, #082C81 100%)",
                borderRadius: "200px 20px 0px 0px",
              }}
            >
              <img
                src="/orxan.png"
                alt="Orxan Məmmədov"
                className="object-cover absolute w-[220px] h-[240px] sm:w-[300px] sm:h-[320px] md:w-[380px] md:h-[400px] lg:w-[440px] lg:h-[460px] xl:w-[496px] xl:h-[500px]"
                style={{
                  bottom: "-30px",
                  right: "-10px",
                }}
                width={496}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Əlaqə forması bölməsi */}
      <div
        className="flex items-center justify-center p-2 sm:p-4"
        style={{ backgroundColor: "#f1f1f1" }}
        ref={contactRef}
      >
        <div className="w-full max-w-2xl p-4 sm:p-8">
          <motion.h1
            className="text-2xl sm:text-4xl font-semibold text-center mb-8 sm:mb-12 text-black"
            variants={leftVariants}
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
          >
            Əlaqə
          </motion.h1>

          <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
            {/* Ad və Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                className="space-y-2"
                variants={leftVariants}
                initial="hidden"
                animate={isContactInView ? "visible" : "hidden"}
              >
                <label htmlFor="ad" className="text-sm sm:text-[16px] font-medium text-black block">
                  Ad
                </label>
                <input
                  id="ad"
                  name="ad"
                  type="text"
                  placeholder="Ismixan"
                  value={contactFormData.ad}
                  onChange={handleContactInputChange}
                  className="h-10 sm:h-12 w-full bg-[#EFEEEE] border border-black px-3 sm:px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black text-sm sm:text-base"
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                variants={rightVariants}
                initial="hidden"
                animate={isContactInView ? "visible" : "hidden"}
              >
                <label htmlFor="soyad" className="text-sm sm:text-[16px] font-medium text-black block">
                  Soyad
                </label>
                <input
                  id="soyad"
                  name="soyad"
                  type="text"
                  placeholder="Ismixanov"
                  value={contactFormData.soyad}
                  onChange={handleContactInputChange}
                  className="h-10 sm:h-12 w-full bg-[#EFEEEE] border border-black px-3 sm:px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black text-sm sm:text-base"
                />
              </motion.div>
            </div>

            {/* Email */}
            <motion.div
              className="space-y-2"
              variants={leftVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}
            >
              <label htmlFor="contact-email" className="text-sm sm:text-[16px] font-medium text-black block">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Example@gmail.com"
                value={contactFormData.email}
                onChange={handleContactInputChange}
                className="h-10 sm:h-12 w-full bg-[#EFEEEE] border border-black px-3 sm:px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black text-sm sm:text-base"
              />
            </motion.div>

            {/* Telefon nömrəsi */}
            <motion.div
              className="space-y-2"
              variants={rightVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}
            >
              <label htmlFor="telefon" className="text-sm sm:text-[16px] font-medium text-black block">
                Telefon nömrəsi
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                placeholder="099 999 99 99"
                value={contactFormData.telefon}
                onChange={handleContactInputChange}
                className="h-10 sm:h-12 w-full bg-[#EFEEEE] border border-black px-3 sm:px-4 py-2 text-black placeholder:text-gray-500 rounded focus:outline-none focus:border-black text-sm sm:text-base"
              />
            </motion.div>

            {/* Mesaj */}
            <motion.div
              className="space-y-2"
              variants={leftVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}
            >
              <label htmlFor="mesaj" className="text-sm sm:text-[16px] font-medium text-black block">
                Mesaj
              </label>
              <textarea
                id="mesaj"
                name="mesaj"
                value={contactFormData.mesaj}
                onChange={handleContactInputChange}
                rows={4}
                placeholder=""
                className="w-full bg-[#EFEEEE] border border-black px-3 sm:px-4 py-2 text-black placeholder:text-gray-500 rounded resize-none focus:outline-none focus:border-black text-sm sm:text-base"
              />
            </motion.div>

            {/* Button */}
            <motion.div
              className="flex justify-end pt-4"
              variants={rightVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}
            >
              <button
                className="hover:text-white px-4 sm:px-8 py-2 rounded-full font-medium text-white text-sm sm:text-base"
                style={{
                  background: "linear-gradient(90deg, #0A4CA5 0%, #4886AD 100%)",
                }}
              >
                Göndər
              </button>
            </motion.div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full mt-12 sm:mt-20 py-6 sm:py-8"
        style={{ backgroundColor: "#f1f1f1", marginTop: "50px" }}
        ref={footerRef}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-6 sm:gap-8">
            {/* Logo */}
            <motion.div
              className="space-y-3 sm:space-y-4 flex flex-col"
              variants={fallDownVariants}
              initial="hidden"
              animate={isFooterInView ? "visible" : "hidden"}
            >
              <div className="flex items-center space-x-2">
                <div className="grid grid-cols-2 gap-1 w-6 h-6 sm:w-8 sm:h-8">
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-green-500 rounded-sm"></div>
                  <div className="bg-yellow-500 rounded-sm"></div>
                  <div className="bg-red-500 rounded-sm"></div>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Onlaynders.az</h2>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Varius enim eu ac tempus integer. In urna eget tortor morbi odio
                sed et tincidunt.
              </p>
            </motion.div>

            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={fallDownVariants}
              initial="hidden"
              animate={isFooterInView ? "visible" : "hidden"}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Ana səhifə</h3>
              <nav className="flex flex-col space-y-2 sm:space-y-3">
                <a href="#" className="text-black hover:text-gray-800 transition-colors text-sm sm:text-base">
                  Haqqımızda
                </a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors text-sm sm:text-base">
                  Dərslər
                </a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors text-sm sm:text-base">
                  Əlaqə
                </a>
                <a href="#" className="text-black hover:text-gray-800 transition-colors text-sm sm:text-base">
                  Təlimçi
                </a>
              </nav>
            </motion.div>

            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={fallDownVariants}
              initial="hidden"
              animate={isFooterInView ? "visible" : "hidden"}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Əlaqə məlumatları</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Hər hansı sualınız varsa bizimlə əlaqə saxlayın</p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  <span className="text-black text-xs sm:text-base">+009 980 92 98</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  <span className="text-black text-xs sm:text-base">info.onlayders@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  <span className="text-black text-xs sm:text-base">Bakı, Azərbaycan</span>
                </div>
                {/* ikonlar  */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                  <IoLogoWhatsapp
                    fontSize={20}
                    className="sm:text-[24px] text-black hover:text-green-500 transition-colors"
                  />
                  <FaSquareInstagram
                    fontSize={20}
                    className="sm:text-[24px] text-black hover:text-pink-500 transition-colors"
                  />
                  <BsLinkedin
                    fontSize={20}
                    className="sm:text-[24px] text-black hover:text-blue-700 transition-colors"
                  />
                  <FaFacebookSquare
                    fontSize={20}
                    className="sm:text-[24px] text-black hover:text-blue-600 transition-colors"
                  />
                  <FaYoutube fontSize={20} className="sm:text-[24px] text-black hover:text-red-600 transition-colors" />
                </div>
              </div>
            </motion.div>
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
