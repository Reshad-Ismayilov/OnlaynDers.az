"use client";
import React from "react";
import { Inter } from "next/font/google";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

function VideoSource() {
  const videos = [
    {
      id: 1,
      watched: true,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      watched: true,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      watched: "pending",
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 6,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 7,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 8,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 9,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 10,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 11,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 12,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 13,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 14,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
    {
      id: 15,
      watched: false,
      title: "Lorem ipsum dolor sit amet",
    },
  ];

  const comments = [
    {
      id: 1,
      userPhoto: "/videoSourceImg/instructor.png",
      userName: "Nübar Həmidli",
      comment:
        "Lorem ipsum dolor sit amet consectetur. Feugiat cras vestibulum sed gravida tempus.",
    },
    {
      id: 2,
      userPhoto: "/videoSourceImg/instructor.png",
      userName: "Nübar Həmidli",
      comment:
        "Lorem ipsum dolor sit amet consectetur. Feugiat cras vestibulum sed gravida tempus.",
    },
    {
      id: 3,
      userPhoto: "/videoSourceImg/instructor.png",
      userName: "Nübar Həmidli",
      comment:
        "Lorem ipsum dolor sit amet consectetur. Feugiat cras vestibulum sed gravida tempus.",
    },
  ];

  return (
    <div
      className={`${inter.className} flex flex-col gap-[40px] md:px-12 sm:px-4 max-sm:px-4 mx-auto py-20 bg-[#F9F8F8]`}
    >
      <form
        className={`flex items-center md:justify-start sm:justify-center max-sm:justify-center sm:gap-1 max-sm:gap-1 md:gap-3 mt-5`}
      >
        <select className="md:w-[250px] sm:w-[200px] max-sm:w-[200px] md:px-4 sm:px-3 max-sm:px-2 py-3 rounded-3xl bg-[#fff] text-[#1B1B1B99] focus:outline-none md:text-[16px] sm:text-[14px] max-sm:text-[14px] font-[400]">
          <option value="">Kurslar və s.</option>
          <option value="">Front-End</option>
          <option value="">UX/UI</option>
          <option value="">Back-End</option>
        </select>
        <select className="md:w-[250px] sm:w-[200px] max-sm:w-[200px] md:px-4 sm:px-3 max-sm:px-2 py-3 rounded-3xl bg-[#fff] text-[#1B1B1B99] focus:outline-none md:text-[16px] sm:text-[14px] max-sm:text-[14px] font-[400]">
          <option value="">Kateqoriyalar</option>
          <option value="">IT Sahəsi</option>
          <option value="">Təhsil Sahəsi</option>
        </select>
        <button className="w-[100px] px-6 py-[5.5px] rounded-3xl text-center bg-[#213E82] text-white md:text-[20px] sm:text-[18px] max-sm:text-[18px] font-[400]">
          Axtar
        </button>
      </form>

      <div className="bg-white rounded-xl flex md:flex-row max-sm:flex-col-reverse max-sm:gap-6 justify-between py-4 ">
        <div className="md:w-[40%] max-sm:w-[100%] flex flex-col gap-2 p-5 py-0">
          <div className="md:flex items-center gap-3 p-5 max-sm:hidden">
            <div className="bg-[#BAC3D8] p-2 rounded-full w-12 h-12 flex items-center justify-center">
              <img src="/videoSourceImg/uxui.svg" alt="UX/UI icon" />
            </div>
            <h2 className="font-[500] text-[16px]">UX/UI Dərsləri</h2>
          </div>

          <div className="flex flex-col gap-4 max-h-[120vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#213E82] scrollbar-track-[#FFFFFF] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`flex gap-3 items-center bg-[#F1ECEC] w-[90%] p-5 rounded-3xl ${
                  video.watched === true && "text-[#00000080]"
                }`}
              >
                {video.id}.
                {video.watched === true || video.watched === false ? (
                  <FaPlay size={13} />
                ) : video.watched === "pending" ? (
                  <FaPause size={13} />
                ) : (
                  ""
                )}
                {video.title}
              </div>
            ))}
          </div>

          {/* Mobile Comments */}
          <div className="max-sm:flex flex-col gap-4 md:hidden mt-10">
            <h3 className="font-[500] text-[24px]">Comments</h3>
            <div className="bg-[#F1ECEC] flex items-center justify-center p-7 rounded-2xl">
              <input
                type="text"
                id=""
                placeholder="Add Comment"
                className="p-5 bg-white w-[97%] text-[16px] font-[500] rounded-xl outline-none"
              />
            </div>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F1ECEC] flex items-center justify-center p-3 rounded-2xl"
              >
                <div className="bg-white w-full flex items-center gap-4 p-2 rounded-3xl">
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="md:w-[8%] max-sm:w-[17%]"
                  />
                  <div>
                    <p className="font-[700] text-[12px]">{comment.userName}</p>
                    <p className="font-[300] text-[12px]">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-[58%] max-sm:w-[100%] flex flex-col gap-5 px-4 mx-auto">
          {/* <video src=''></video> */}

          <div className="bg-black w-[100%] md:h-[400px] max-sm:h-[200px] mt-8 rounded-3xl"></div>

          {/* Mobile */}
          <div className="max-sm:flex md:hidden flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#BAC3D8] p-2 rounded-full w-12 h-12 flex items-center justify-center">
                <img src="/videoSourceImg/uxui.svg" alt="UX/UI icon" />
              </div>
              <h2 className="font-[500] text-[16px]">UX/UI Dərsləri</h2>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/videoSourceImg/instructor.png"
                alt="Profile Photo"
                className="w-[14%]"
              />
              <div>
                <p className="font-[700] text-[16px]">Rahibə Sultanova</p>
                <p className="font-[500] text-[12px] text-[#838080]">
                  Professional UX/UI Designer
                </p>
              </div>
            </div>
          </div>

          <div className="md:px-5 max-sm:px-2 flex flex-col gap-4">
            <h3 className="font-[700] text-[18px]">
              Lorem ipsum dolor sit amet consectetur. Urna vitae nisl luctus
              orci vestibulum
            </h3>
            <p className="font-[500] text-[16px] text-[#777272] md:w-[80%] max-sm:w-full">
              Lorem ipsum dolor sit amet consectetur. Congue ultrices ultrices
              vulputate accumsan morbi sed cras dui fermentum. Commodo tellus
              lobortis at elit. Gravida integer et porta tincidunt. Commodo
              sagittis suscipit nibh semper. Commodo tellus lobortis at elit.
              Gravida integer et porta tincidunt. Commodo sagittis suscipit nibh
              semper.
            </p>
          </div>

          <div className="md:flex max-sm:hidden items-center gap-3">
            <img
              src="/videoSourceImg/instructor.png"
              alt="Profile Photo"
              className="w-[9%]"
            />
            <div>
              <p className="font-[700] text-[16px]">Rahibə Sultanova</p>
              <p className="font-[500] text-[12px] text-[#838080]">
                Professional UX/UI Designer
              </p>
            </div>
          </div>

          <div className="md:flex flex-col gap-4 max-sm:hidden">
            <h3>Comments</h3>
            <div className="bg-[#F1ECEC] flex items-center justify-center p-7 rounded-2xl">
              <input
                type="text"
                id=""
                placeholder="Add Comment"
                className="p-5 bg-white w-[97%] text-[16px] font-[500] rounded-xl outline-none"
              />
            </div>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F1ECEC] flex items-center justify-center p-7 rounded-2xl"
              >
                <div className="bg-white w-full flex items-center gap-4 p-2 rounded-3xl">
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="md:w-[8%] max-sm:w-[17%]"
                  />
                  <div>
                    <p className="font-[700] text-[12px]">{comment.userName}</p>
                    <p className="font-[300] text-[12px]">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSource;
