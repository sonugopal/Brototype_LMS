"use client";

import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { useSession } from "next-auth/react";

import ReactPlayer from "react-player";
import YouTube, { YouTubeProps } from "react-youtube";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { headers } from "next/headers";
import apiService from "@/service/apiService";
import { UpdateWatchTime } from "@/service/axios-services/dataFetching";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  videoUrl: string | null;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const [domLoaded, setDomLoaded] = useState(false);

  const [watchTime, setWatchTime] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  const { data: session }: any = useSession()


  const handlePlay = () => {
    startTimeRef.current = Date.now();
  };

  const handleEnd = () => {
    if (startTimeRef.current) {
      const endTime = Date.now();
      const watchedTime = (endTime - startTimeRef.current) / 1000;
      setWatchTime(prevWatchTime => {
        const newWatchTime = prevWatchTime + watchedTime;
        localStorage.setItem('watchTime', JSON.stringify(newWatchTime));
        return newWatchTime;
      });
    }
  };

  const handlePause = () => {
    if (startTimeRef.current) {
      const endTime = Date.now();
      const watchedTime = (endTime - startTimeRef.current) / 1000;
      setWatchTime(prevWatchTime => {
        const newWatchTime = prevWatchTime + watchedTime;
        localStorage.setItem('watchTime', JSON.stringify(newWatchTime));
        return newWatchTime;
      });
    }
  };

  useEffect(() => {
    const sendWatchTimeToServer = async () => {
      let watchTime = JSON.parse(localStorage.getItem('watchTime') || '0');
      watchTime = Math.floor(watchTime);
      if (watchTime > 15) {
        try{
          await UpdateWatchTime(session.user.userid!, watchTime)
          localStorage.removeItem('watchTime');
        }catch(error){
          console.log("ERror:", error)
        }
      }
    };
    sendWatchTimeToServer();
  }, [session?.user?.userid]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const onEnd = async () => {
    try {
      await handleEnd()
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: true,
        }
      );

      if (!nextChapterId) {
        confetti.onOpen();
      }

      toast.success("Progress updated");
      router.refresh();

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
      rel: 1,
    },
    width: "100%",
    height: "100%",
  };
  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8 text-white" />
          <p className="text-sm text-white">This chapter is locked</p>
        </div>
      )}
      {!isLocked && domLoaded && (
        <div className="youtubePlayer w-full h-full">
          {<YouTube
            videoId={videoUrl as string}
            opts={opts}
            onEnd={onEnd}
            onPlay={handlePlay}
            onPause={handlePause}
          />}
        </div>
      )}
    </div>
  );
};
