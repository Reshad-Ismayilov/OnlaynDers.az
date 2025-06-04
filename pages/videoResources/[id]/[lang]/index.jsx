import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { FaPlay, FaPause } from "react-icons/fa";
import { useRouter } from "next/router";
import api from "@/utils/api";
import VideoPlayer from "@/components/videoSource/VideoPlayer";
import { useAuth } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

// Video List Component
const VideoList = ({ videos = [], setCurrentVideo }) => (
  <div className="flex flex-col gap-4 max-h-[120vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#213E82] scrollbar-track-[#FFFFFF] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    {videos.length > 0 ? (
      videos.map((video, index) => (
        <div
          key={video.id}
          onClick={() => setCurrentVideo(video)}
          className={`flex gap-3 items-center bg-[#F1ECEC] w-[90%] p-5 rounded-3xl cursor-pointer ${
            video.watched ? "text-[#00000080]" : ""
          }`}
        >
          {index + 1}.
          {video.watched === true ? (
            <FaPlay size={13} />
          ) : video.watched === "pending" ? (
            <FaPause size={13} />
          ) : null}
          {video.title}
        </div>
      ))
    ) : (
      <p>Heç bir video tapılmadı.</p>
    )}
  </div>
);

// Video Resources Component
const VideoResources = () => {
  const router = useRouter();
  const { id, lang } = router.query;

  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const { isAuthenticated } = useAuth();
  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me");
      setUser(response.data);
    } catch (err) {
      if (err.response) {
        // Handle JSON error responses
        if (err.response.data && typeof err.response.data === "object") {
          setError(err.response.data.error || err.message);
        } else {
          // Handle non-JSON responses
          try {
            const errorData = JSON.parse(err.response.data);
            setError(errorData.error || err.message);
          } catch (parseError) {
            setError(err.response.data || err.message);
          }
        }

        if (err.response.status === 401) {
          window.location.href = "/"; // Redirect to login page
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when id and lang are available
  useEffect(() => {
    getUserInfo();
    if (!id || !lang) return;

    const fetchData = async () => {
      try {
        const lessonResponse = await api.get(`course/detail/get/${id}/${lang}`);
        const videosResponse = await api.get(
          `/lesson/lesson/dashboard/detail/${id}/${lang}`
        );
        const userResponse = await api.get("auth/me");

        setLesson(lessonResponse.data);
        setVideos(videosResponse.data);
        setUser(userResponse.data);

       

        // Set the first video as the current video
        if (videosResponse.data.length > 0) {
          setCurrentVideo(videosResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, lang]);

  // Handle video click
  const handleVideoClick = (video) => {
    setCurrentVideo(video);
  };

  // Loading state
  if (!id || !lesson || !user || !videos.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${inter.className} flex flex-col gap-[40px] md:px-12 sm:px-4 max-sm:px-4 mx-auto py-20 bg-[#F9F8F8]`}
    >
      <div className="bg-white rounded-xl flex md:flex-row max-sm:flex-col-reverse max-sm:gap-6 justify-between py-4">
        {/* Left Column: Video List */}
        <div className="md:w-[40%] max-sm:w-[100%] flex flex-col gap-2 p-5 py-0">
          <div className="md:flex items-center gap-3 p-5 max-sm:hidden">
            <div className="bg-[#BAC3D8] p-2 rounded-full w-12 h-12 flex items-center justify-center">
              <img src="/videoSourceImg/uxui.svg" alt="UX/UI icon" />
            </div>
            <h2 className="font-[500] text-[16px]">{lesson?.title}</h2>
          </div>

          <VideoList videos={videos} setCurrentVideo={handleVideoClick} />

          <Link
            href={`/tests/${id}`}
            className="mb-14 bg-[#213E82] w-[17%] text-white text-[12px] font-[500] py-5 text-center rounded-3xl md:block sm:hidden max-sm:hidden"
          >
            Teste başla
          </Link>
        </div>

        {/* Right Column: Video Player */}
        <div className="md:w-[58%] max-sm:w-[100%] flex flex-col gap-5 px-4 mx-auto">
          <div className="bg-black w-full h-[400px] rounded-xl overflow-hidden flex items-center justify-center">
            {currentVideo && user && (
              <VideoPlayer
                userId={user.id}
                videoId={currentVideo.id}
                lesson={currentVideo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResources;
