import { VIDEO_CDN } from "@/config/siteVideos";

/** 与官网 companyVideo 页一致（ztoglobal webpack 静态配置 + CDN） */
const THUMB_ORIGIN = "https://www.ztoglobal.com/img/cn/about/companyVideo";

export interface CorporateVideoItem {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
}

export const CORPORATE_VIDEOS: CorporateVideoItem[] = [
  {
    id: "1",
    title: "中通国际品牌宣传片（中文版）",
    videoUrl: `${VIDEO_CDN}/home_video.mp4`,
    posterUrl: `${THUMB_ORIGIN}/1.png`,
  },
  {
    id: "2",
    title: "中通国际品牌宣传片（英文版）",
    videoUrl: `${VIDEO_CDN}/home_video_en.mp4`,
    posterUrl: `${THUMB_ORIGIN}/2.png`,
  },
  {
    id: "3",
    title: "中通快递虎年春节视频「更好的2022，更好的我们」",
    videoUrl: `${VIDEO_CDN}/3.mp4`,
    posterUrl: `${THUMB_ORIGIN}/3.png`,
  },
  {
    id: "4",
    title: "中通快递2021「双11」宣传片",
    videoUrl: `${VIDEO_CDN}/4.mp4`,
    posterUrl: `${THUMB_ORIGIN}/4.png`,
  },
  {
    id: "5",
    title: "中通快递19周年主题宣传片",
    videoUrl: `${VIDEO_CDN}/5.mp4`,
    posterUrl: `${THUMB_ORIGIN}/5.png`,
  },
];
