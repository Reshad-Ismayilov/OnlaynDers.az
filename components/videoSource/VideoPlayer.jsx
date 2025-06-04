"use client";
import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player/vimeo";
import api from "@/utils/api";

const VideoPlayer = ({ lesson }) => {
  const playerRef = useRef(null);
  const [hasSentWatched, setHasSentWatched] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

  const handleProgress = async ({ playedSeconds }) => {
    if (!lesson || !lesson.id || !lesson.videoUrl) return;

    const progressPercentage = playedSeconds / totalDuration;

    if (progressPercentage >= 0.9 && !hasSentWatched) {
      try {
        await api.post("/user-progress/update", {
          lessonId: lesson.id,
          watchedTime: playedSeconds,
          totalDuration: totalDuration,
        });
        setHasSentWatched(true);
      } catch (error) {
        console.error("Progress göndərilərkən xəta baş verdi:", error);
      }
    }
  };

  const handleDuration = (duration) => {
    setTotalDuration(duration);
  };

  if (!lesson || !lesson.videoUrl) {
    return <p>Video tapılmadı.</p>;
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={lesson.videoUrl}
        controls
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </div>
  );
};

export default VideoPlayer;
