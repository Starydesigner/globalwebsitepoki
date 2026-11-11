/**
 * 站内视频资源约定
 *
 * - 首屏 Hero、企业视频等：统一走 CDN，不进仓库
 * - 首页使命区滚动 scrub：仅保留 mission-scene-1080p（<100MB，需随站部署）
 */

export const VIDEO_CDN = "https://app.ztoglobal.com/onlineResources/videos/cn";

/** 首页首屏背景视频 */
export const HOME_HERO_VIDEO_URL = `${VIDEO_CDN}/home_video.mp4`;

/** 使命区滚动视频（相对站点根 asset/） */
export const MISSION_SCENE_VIDEO_ASSET = "asset/video/mission-scene-1080p.mp4?v=2";

export const MISSION_SCENE_POSTER_ASSET = "asset/images/mission-scene-poster.jpg?v=2";
