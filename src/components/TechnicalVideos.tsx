"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaEye } from "react-icons/fa";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views?: number;
  url: string;
}

interface YouTubeData {
  id: string;
  snippet?: {
    title?: string;
    thumbnails?: {
      maxres?: { url: string };
      high?: { url: string };
    };
  };
  statistics?: {
    viewCount?: string;
  };
}

const videos: Video[] = [
  {
    id: "t-qdemV4Yo0",
    title:
      "How to get Solana DEXTrades Data just like DEXScreener shows - Bitquery API Tutorial",
    url: "https://youtu.be/t-qdemV4Yo0",
    thumbnail: "https://i.ytimg.com/vi/t-qdemV4Yo0/hqdefault.jpg",
    views: 0,
  },
  {
    id: "QV8zBnmDFxY",
    title:
      "How to Track Pump Fun DEX Trades and Newly Launched Tokens in Realtime - Bitquery API Tutorial",
    url: "https://youtu.be/QV8zBnmDFxY",
    thumbnail: "https://i.ytimg.com/vi/QV8zBnmDFxY/hqdefault.jpg",
    views: 0,
  },
  {
    id: "P8BMl0X5d8o",
    title:
      "How to get newly created tokens on Solana Blockchain in realtime | Bitquery Solana Instructions API",
    url: "https://youtu.be/P8BMl0X5d8o",
    thumbnail: "https://i.ytimg.com/vi/P8BMl0X5d8o/hqdefault.jpg",
    views: 0,
  },
];

export default function TechnicalVideos() {
  const [videoData, setVideoData] = useState<Video[]>(videos);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoIds = videos.map((v) => v.id).join(",");
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        if (data.items) {
          const updatedVideos = videos.map((video) => {
            const youtubeData = data.items.find(
              (item: YouTubeData) => item.id === video.id
            );
            return {
              ...video,
              title: youtubeData?.snippet?.title || video.title,
              views: parseInt(youtubeData?.statistics?.viewCount || "0"),
            };
          });

          setVideoData(updatedVideos);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        console.error("Error fetching videos:", errorMessage);
      }
    };

    fetchVideoData();
    const interval = setInterval(fetchVideoData, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Technical Videos
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 text-xl text-gray-300"
          >
            <FaYoutube className="text-2xl text-red-500" />
            <span>80+ Technical Tutorials</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden bg-purple-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={480}
                  height={360}
                  priority={index < 3}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaYoutube className="text-6xl text-red-500 drop-shadow-lg" />
                </motion.a>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-400">
                  <FaEye className="mr-2" />
                  {video.views && video.views > 0
                    ? new Intl.NumberFormat().format(video.views)
                    : "Loading..."}{" "}
                  views
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.youtube.com/@bitquery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-lg font-medium"
          >
            <FaYoutube className="text-xl" />
            View More Tutorials
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
