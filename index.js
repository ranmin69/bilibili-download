
const { args } = Deno;

import { getArg } from "./module/tool.js";
import { getCookie, setCookie } from "./module/cookie.js";
import download from './module/download.js'
import userVideo from "./module/userVideo.js";

import config from "./module/config.js";
const { headers, args: arrArgs } = config;
const { urlIndex, cookieIndex, userIndex } = getArg(args, arrArgs);

/**
 * 设置 cookie
 */
cookieIndex ? setCookie(args[cookieIndex]) : null;

/**
 * 获取 cookie
 * @type {string}
 */
headers.cookie = getCookie()

/**
 * 判断 有URL，则下载视频。
 */
urlIndex ? await download(args[urlIndex]) : null;

/**
 * 判断是否是下载 所有视频
 */
userIndex ? userVideo(args[userIndex]) : null;

console.log('test2');

/**
 * 模仿 浏览器环境 使用 ffmpeg.wasm 来完成音视频合并，始终搞不定，垃圾Deno 😂。
 */
/*import { FFmpeg } from 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.7/dist/esm/index.js'
const ffmpeg = new FFmpeg();
await ffmpeg.load({
  coreURL:  `https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.js`,
  wasmURL: `https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.wasm`,
});
await ffmpeg.exec([
  '-i', `${cwd()}/video.mp4`,
  '-i', `${cwd()}/audio.mp4`,
  '-c:v', 'copy',
  '-c:a', 'aac',
  "-strict", "experimental",
  'output.mp4',
]);*/
